const selectors = {
    customerAddresses: '[data-customer-addresses]',
    addressCountrySelect: '[data-address-country-select]',
    addressContainer: '[data-address]',
};

class CustomerAddresses {
    constructor() {
        this.elements = this._getElements();
        if (Object.keys(this.elements).length === 0) return;
        this._setupCountries();
    }

    _getElements() {
        const container = document.querySelector(selectors.customerAddresses);
        return container
            ? {
                container,
                addressContainer: container.querySelector(selectors.addressContainer),
                countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
            }
            : {};
    };

    _setupCountries() {
        if (Shopify && Shopify.CountryProvinceSelector) {
            new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
                hideElement: 'AddressProvinceContainerNew',
            });

            this.elements.countrySelects.forEach((select) => {
                const formId = select.dataset.formId;

                new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
                    hideElement: `AddressProvinceContainer_${formId}`,
                });
            });
        }
    };
}
