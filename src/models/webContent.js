const { default: mongoose } = require('mongoose');
const mongose = require('mongoose');

const contentSchema = new mongoose.Schema({
    landingPage: {
        backgroundImageUrl : {
            type : String
        },
        mainHeading : {
            type : String
        },
        mainText : {
            type : String
        },
        workFlow: [
            {
                iconUrl : {
                    type : String
                },
                heading : {
                    type : String
                },
                text : {
                    type : String
                }
            }
        ],
        chooseUs: [
            {
                iconUrl : {
                    type : String
                },
                heading : {
                    type : String
                },
                text : {
                    type : String
                }
            }
        ],
        brands: [
            {
                logoUrl : {
                    type : String
                },
                brandName : {
                    type : String
                }
            }
        ],
        ourFleet: [
            {
                imageUrl : {
                    type : String
                },
                title : {
                    type : String
                },
                text : {
                    type : String
                },
            }
        ]
    },
    reservationsPage : {
        backgroundImageUrl : {
            type : String
        },
        mainHeading : {
            type : String
        },
        mainText : {
            type : String
        }
    },
    termsConditionsPage : {
        lastUpdated : {
            type : Date,
            required : true,
            default : new Date()
        },
        pageContent : {
            type : String
        }
    },
    contactUsPage : {
        mainHeading : {
            type : String
        },
        mainText : {
            type : String
        },
        offices : [
            {
                infoText : {
                    type : String
                }
            }
        ],
        deliveryLocations : [
            {
                location : {
                    type : String
                }
            }
        ]
    },
    privacyPolicyPage : {
        pageContent : {
            type : String
        },
        lastUpdated : {
            type : Date,
            required : true,
            default : new Date()
        },

    }

});

const contentModel =  new mongoose.model('webContent', contentSchema);
module.exports =  contentModel;