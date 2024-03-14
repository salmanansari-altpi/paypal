const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));


const generateAccessToken = async () => {
    const clientId = process.env.API_KEY
    const clientSec = process.env.API_SEC
    try {
        if (!clientId || !clientSec) {
            return res.status(401).json({ success: false, message: 'Api Key and secret not found!' })
        }
        const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "accept-language": "en_US",
                "content-type": "application/x-www-form-urlencoded",
                "authorization": `basic ${Buffer.from(`${clientId}:${clientSec}`).toString('base64')}`
            },
            // headers: {
            //     Authorization: `Basic ${Buffer.from(`${clientId}:${clientSec}`).toString('base64')}`,
            // },
            body: 'grant_type=client_credentials'
        })

        const data = await response.json()
        return data
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const onBoard = async (req, res) => {
    try {
        const { individualOwner, businessEntity, email, trackingId, preferredLanguage, operation, legalConsents, products } = req.body

        const dataa = {
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

        console.log(dataa);

        const datab = {
            "individual_owners": [
                {
                    "names": [
                        {
                            "prefix": "Mr.",
                            "given_name": "John",
                            "surname": "Doe",
                            "middle_name": "Middle",
                            "suffix": "Jr.",
                            "full_name": "John Middle Doe Jr.",
                            "type": "LEGAL"
                        }
                    ],
                    "citizenship": "US",
                    "addresses": [
                        {
                            "address_line_1": "One Washington Square",
                            "address_line_2": "Apt 123",
                            "admin_area_2": "San Jose",
                            "admin_area_1": "CA",
                            "postal_code": "95112",
                            "country_code": "US",
                            "type": "HOME"
                        }
                    ],
                    "phones": [
                        {
                            "country_code": "1",
                            "national_number": "6692468839",
                            "extension_number": "1234",
                            "type": "MOBILE"
                        }
                    ],
                    "birth_details": {
                        "date_of_birth": "1955-12-29"
                    },
                    "type": "PRIMARY"
                }
            ],
            "business_entity": {
                "business_type": {
                    "type": "INDIVIDUAL",
                    "subtype": "ASSO_TYPE_INCORPORATED"
                },
                "business_industry": {
                    "category": "1004",
                    "mcc_code": "8931",
                    "subcategory": "2025"
                },
                "business_incorporation": {
                    "incorporation_country_code": "US",
                    "incorporation_date": "1986-12-29"
                },
                "names": [
                    {
                        "business_name": "Test Enterprise",
                        "type": "LEGAL_NAME"
                    }
                ],
                "emails": [
                    {
                        "type": "CUSTOMER_SERVICE",
                        "email": "customerservice@example.com"
                    }
                ],
                "website": "https://mystore.testenterprises.com",
                "addresses": [
                    {
                        "address_line_1": "One Washington Square",
                        "address_line_2": "Apt 123",
                        "admin_area_2": "San Jose",
                        "admin_area_1": "CA",
                        "postal_code": "95112",
                        "country_code": "US",
                        "type": "WORK"
                    }
                ],
                "phones": [
                    {
                        "country_code": "1",
                        "national_number": "6692478833",
                        "extension_number": "1234",
                        "type": "CUSTOMER_SERVICE"
                    }
                ],
                "beneficial_owners": {
                    "individual_beneficial_owners": [
                        {
                            "names": [
                                {
                                    "prefix": "Mr.",
                                    "given_name": "John",
                                    "surname": "Doe",
                                    "middle_name": "Middle",
                                    "suffix": "Jr.",
                                    "full_name": "John Middle Doe Jr.",
                                    "type": "LEGAL"
                                }
                            ],
                            "citizenship": "US",
                            "addresses": [
                                {
                                    "address_line_1": "One Washington Square",
                                    "address_line_2": "Apt 123",
                                    "admin_area_2": "San Jose",
                                    "admin_area_1": "CA",
                                    "postal_code": "95112",
                                    "country_code": "US",
                                    "type": "HOME"
                                }
                            ],
                            "phones": [
                                {
                                    "country_code": "1",
                                    "national_number": "6692468839",
                                    "extension_number": "1234",
                                    "type": "MOBILE"
                                }
                            ],
                            "birth_details": {
                                "date_of_birth": "1955-12-29"
                            },
                            "percentage_of_ownership": "50"
                        }
                    ],
                    "business_beneficial_owners": [
                        {
                            "business_type": {
                                "type": "INDIVIDUAL",
                                "subtype": "ASSO_TYPE_INCORPORATED"
                            },
                            "business_industry": {
                                "category": "1004",
                                "mcc_code": "8931",
                                "subcategory": "2025"
                            },
                            "business_incorporation": {
                                "incorporation_country_code": "US",
                                "incorporation_date": "1986-12-29"
                            },
                            "names": [
                                {
                                    "business_name": "Test Enterprise",
                                    "type": "LEGAL_NAME"
                                }
                            ],
                            "emails": [
                                {
                                    "type": "CUSTOMER_SERVICE",
                                    "email": "customerservice@example.com"
                                }
                            ],
                            "website": "https://mystore.testenterprises.com",
                            "addresses": [
                                {
                                    "address_line_1": "One Washington Square",
                                    "address_line_2": "Apt 123",
                                    "admin_area_2": "San Jose",
                                    "admin_area_1": "CA",
                                    "postal_code": "95112",
                                    "country_code": "US",
                                    "type": "WORK"
                                }
                            ],
                            "phones": [
                                {
                                    "country_code": "1",
                                    "national_number": "6692478833",
                                    "extension_number": "1234",
                                    "type": "CUSTOMER_SERVICE"
                                }
                            ],
                            "percentage_of_ownership": "50"
                        }
                    ]
                },
                "office_bearers": [
                    {
                        "names": [
                            {
                                "prefix": "Mr.",
                                "given_name": "John",
                                "surname": "Doe",
                                "middle_name": "Middle",
                                "suffix": "Jr.",
                                "full_name": "John Middle Doe Jr.",
                                "type": "LEGAL"
                            }
                        ],
                        "citizenship": "US",
                        "addresses": [
                            {
                                "address_line_1": "One Washington Square",
                                "address_line_2": "Apt 123",
                                "admin_area_2": "San Jose",
                                "admin_area_1": "CA",
                                "postal_code": "95112",
                                "country_code": "US",
                                "type": "HOME"
                            }
                        ],
                        "phones": [
                            {
                                "country_code": "1",
                                "national_number": "6692468839",
                                "extension_number": "1234",
                                "type": "MOBILE"
                            }
                        ],
                        "birth_details": {
                            "date_of_birth": "1955-12-29"
                        },
                        "role": "DIRECTOR"
                    }
                ],
                "annual_sales_volume_range": {
                    "minimum_amount": {
                        "currency_code": "USD",
                        "value": "10000"
                    },
                    "maximum_amount": {
                        "currency_code": "USD",
                        "value": "50000"
                    }
                },
                "average_monthly_volume_range": {
                    "minimum_amount": {
                        "currency_code": "USD",
                        "value": "1000"
                    },
                    "maximum_amount": {
                        "currency_code": "USD",
                        "value": "50000"
                    }
                },
                "purpose_code": "P0104"
            },
            "email": "accountemail@example.com",
            "preferred_language_code": "en-US",
            "tracking_id": "testenterprices123122",
            "partner_config_override": {
                "partner_logo_url": "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
                "return_url": "https://testenterprises.com/merchantonboarded",
                "return_url_description": "the url to return the merchant after the paypal onboarding process.",
                "action_renewal_url": "https://testenterprises.com/renew-exprired-url",
                "show_add_credit_card": true
            },
            "operations": [
                {
                    "operation": "BANK_ADDITION"
                }
            ],
            "financial_instruments": {
                "banks": [
                    {
                        "nick_name": "Bank of America",
                        "account_number": "123405668293",
                        "account_type": "CHECKING",
                        "currency_code": "USD",
                        "identifiers": [
                            {
                                "type": "ROUTING_NUMBER_1",
                                "value": "123456789"
                            }
                        ]
                    }
                ]
            },
            "legal_consents": [
                {
                    "type": "SHARE_DATA_CONSENT",
                    "granted": true
                }
            ],
            "products": [
                "EXPRESS_CHECKOUT"
            ]
        }

        const datac = {
            customer_data: {
                customer_type: 'MERCHANT',
                person_details: {
                    email_address: 'salmanansar@gmail.com',
                    date_of_birth: { event_type: 'BIRTH', event_date: '1986-2-3T23:59:59.999Z' },
                    nationality_country_code: 'US',
                    name: { given_name: 'Salman', surname: 'Khan' }
                },
                business_details: {
                    phone_contacts: [
                        {
                            phone_number_details: { country_code: '1', national_number: '6025550128' },
                            phone_type: 'FAX'
                        }
                    ],
                    business_address: {
                        line1: '9999 N 90th Street',
                        state: 'AZ',
                        city: 'Scottsdale',
                        country_code: 'US',
                        postal_code: '85258'
                    },
                    business_type: 'PROPRIETORSHIP',
                    category: '1008',
                    sub_category: '2076',
                    names: [{ type: 'LEGAL', name: 'Camera Shop' }],
                    business_description: 'Physical goods from the Camera Shop',
                    event_dates: [
                        {
                            event_type: 'ESTABLISHED',
                            event_date: '2009-01-01T13:59:45Z'
                        }
                    ],
                    website_urls: ['https://camerashop.example.com'],
                    annual_sales_volume_range: {
                        minimum_amount: { currency: 'USD', value: '60000' },
                        maximum_amount: { currency: 'USD', value: '300000' }
                    },
                    average_monthly_volume_range: {
                        minimum_amount: { currency: 'USD', value: '5000' },
                        maximum_amount: { currency: 'USD', value: '24999' }
                    },
                    email_contacts: [
                        {
                            email_address: 'support@camerashop.example.com',
                            role: 'CUSTOMER_SERVICE'
                        }
                    ]
                },
                preferred_language_code: 'en_US',
                primary_currency_code: 'USD',
                partner_specific_identifiers: [{ type: 'TRACKING_ID', value: '1539794225122' }]
            },
            requested_capabilities: [
                {
                    capability: 'API_INTEGRATION',
                    api_integration_preference: {
                        partner_id: 'BSD55M2TSQT71',
                        rest_api_integration: {
                            integration_method: 'PAYPAL',
                            integration_type: 'THIRD_PARTY'
                        },
                        rest_third_party_details: {
                            partner_client_id: 'AViNcnTmPaYZ3VltsmWEN3UmogFcZnjKsnqaitDo2cHrEEl1Rlns4GSz36CSUl69q9eADJwEItR0Rq7M',
                            feature_list: [
                                'PAYMENT',
                                'REFUND',
                                'PARTNER_FEE',
                                'UPDATE_SELLER_DISPUTE',
                                'READ_SELLER_DISPUTE',
                                'DELAY_FUNDS_DISBURSEMENT'
                            ]
                        }
                    }
                }
            ],
            web_experience_preference: {
                partner_logo_url: 'https://example.com/image.jpg',
                return_url: 'https://www.paypal.com/apex/api/redirect/success/connected/getPartnerReferralData?isInteractive=true&userId=1717186577731625198991&productId=8',
                action_renewal_url: 'https://www.paypal.com/apex/api/redirect/success/connected/getPartnerReferralData?isInteractive=true&userId=1717186577731625198991&productId=8'
            },
            collected_consents: [{ type: 'SHARE_DATA_CONSENT', granted: true }],
            products: ['EXPRESS_CHECKOUT']
        }

        const { access_token } = await generateAccessToken();
        const response = await fetch('https://api.sandbox.paypal.com/v2/customer/partner-referrals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access_token}`
                'Authorization': `Bearer A21AAL5Z5nKtiGmhDwI3o7XSHCQ7GOpO3bGQbHEOltXd8mWd2S7zyxpsKyMap_-inZHBYouiBY-y2v_84eMNmektPJftxxhuw`
            },
            body: JSON.stringify(dataa)
        })
        const resData = await response.json()
        res.status(201).json({ success: true, data: resData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { onBoard }