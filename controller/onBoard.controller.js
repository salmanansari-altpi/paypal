const { generateAccessToken } = require("../utils/generateToken");
const { onBoardSeller } = require("../utils/partnerReferral");

const onBoard = async (req, res) => {
    try {
        const { individualOwner, businessEntity, email, trackingId, preferredLanguage, operation, legalConsents, products } = req.body

        const data = {
            individual_owners: [
                {
                    names: [
                        {
                            prefix: "Mr.",
                            given_name: individualOwner.firstName,
                            surname: individualOwner.lastName,
                            middle_name: individualOwner.MiddleName,
                            suffix: "Jr.",
                            full_name: "John Middle Doe Jr.",
                            type: individualOwner.nameType
                        }
                    ],
                    citizenship: individualOwner.citizenship,
                    addresses: [
                        {
                            address_line_1: individualOwner.address1,
                            address_line_2: individualOwner.address2,
                            admin_area_2: "San Jose",
                            admin_area_1: "CA",
                            postal_code: individualOwner.postalCode,
                            country_code: individualOwner.addressCountryCode,
                            type: individualOwner.addressType
                        }
                    ],
                    phones: [
                        {
                            country_code: individualOwner.phoneCountryCode,
                            national_number: "6692468839",
                            extension_number: "1234",
                            type: individualOwner.phoneType
                        }
                    ],
                    birth_details: {
                        date_of_birth: individualOwner.birthDetails
                    },
                    type: individualOwner.actualType
                }
            ],
            business_entity: {
                business_type: {
                    type: businessEntity.businessType,
                    subtype: businessEntity.businessSubType
                },
                business_industry: {
                    category: businessEntity.category,
                    mcc_code: businessEntity.mccCode,
                    subcategory: businessEntity.subcategory
                },
                business_incorporation: {
                    incorporation_country_code: businessEntity.bussinessCountryCode,
                    incorporation_date: businessEntity.date
                },
                names: [
                    {
                        business_name: businessEntity.name,
                        type: businessEntity.nameType
                    }
                ],
                emails: [
                    {
                        type: businessEntity.emailType,
                        email: businessEntity.email
                    }
                ],
                website: "https://mystore.testenterprises.com",
                addresses: [
                    {
                        address_line_1: businessEntity.address1,
                        address_line_2: businessEntity.address2,
                        admin_area_2: "San Jose",
                        admin_area_1: "CA",
                        postal_code: businessEntity.postalCode,
                        country_code: businessEntity.bussinessCountryCode,
                        type: businessEntity.addressType
                    }
                ],
                phones: [
                    {
                        country_code: businessEntity.phoneCountryCode,
                        national_number: "6692478833",
                        extension_number: "1234",
                        type: businessEntity.phoneType
                    }
                ],
                office_bearers: [
                    {
                        names: [
                            {
                                prefix: "Mr.",
                                given_name: "John",
                                surname: "Doe",
                                middle_name: "Middle",
                                suffix: "Jr.",
                                full_name: "John Middle Doe Jr.",
                                type: "LEGAL"
                            }
                        ],
                        citizenship: "US",
                        addresses: [
                            {
                                address_line_1: "One Washington Square",
                                address_line_2: "Apt 123",
                                admin_area_2: "San Jose",
                                admin_area_1: "CA",
                                postal_code: "95112",
                                country_code: "US",
                                type: "HOME"
                            }
                        ],
                        phones: [
                            {
                                country_code: "1",
                                national_number: "6692468839",
                                extension_number: "1234",
                                type: "MOBILE"
                            }
                        ],
                        birth_details: {
                            date_of_birth: "1955-12-29"
                        },
                        role: "DIRECTOR"
                    }
                ],
                annual_sales_volume_range: {
                    minimum_amount: {
                        currency_code: "USD",
                        value: "10000"
                    },
                    maximum_amount: {
                        currency_code: "USD",
                        value: "50000"
                    }
                },
                average_monthly_volume_range: {
                    minimum_amount: {
                        currency_code: "USD",
                        value: "1000"
                    },
                    maximum_amount: {
                        currency_code: "USD",
                        value: "50000"
                    }
                },
                purpose_code: "P0104"
            },
            email: email,
            preferred_language_code: preferredLanguage,
            tracking_id: trackingId,
            partner_config_override: {
                partner_logo_url: "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
                return_url: "https://testenterprises.com/merchantonboarded",
                return_url_description: "the url to return the merchant after the paypal onboarding process.",
                action_renewal_url: "https://testenterprises.com/renew-exprired-url",
                show_add_credit_card: true
            },
            operations: [
                {
                    operation: operation
                }
            ],
            legal_consents: [
                {
                    "type": legalConsents.type,
                    "granted": legalConsents.granted
                }
            ],
            products: products
        }

        const { access_token } = await generateAccessToken();
        const resData = await onBoardSeller('A21AAL5Z5nKtiGmhDwI3o7XSHCQ7GOpO3bGQbHEOltXd8mWd2S7zyxpsKyMap_-inZHBYouiBY-y2v_84eMNmektPJftxxhuw', data)
        res.status(201).json({ success: true, data: resData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message })
    }
}


const onBoardWebhook = async (req, res) => {
    try {
        console.log(req);
        res.json({ success: true })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { onBoard, onBoardWebhook }