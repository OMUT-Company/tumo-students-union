const asyncHandler = require("express-async-handler")

const Organisation = require("../models/OrganizationModel");
const OrganizationOffer = require("../models/OrganizationOfferModal")

//@des Adding funding organization
//@route POST /api/organization/create
//@access private
const create = asyncHandler(async (req, res) => {
    const {name, director, address, email, number} = req.body

    try {
        const financierExist = await Organisation.findOne({name})

        if (financierExist) {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Organization already exist"
                }
            })
        } else {
            if (!name || !director || !address || !number) {
                res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "All fields are required"
                    }
                })
            } else {
                //Create organisation
                const organization = await Organisation.create(req.body)

                if (organization) {
                    res.status(201).json({
                        success: true,
                        data: {
                            result: null,
                            message: "Organisation added successfully"
                        },
                        error: null
                    })
                } else {
                    res.status(400).j({
                        success: false,
                        data: null,
                        error: {
                            message: "Something went wrong"
                        }
                    })
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

//@des Get funding organization
//@route GET /api/organization/get
//@access private
const get = asyncHandler(async (req, res) => {
    try {
        const organizations = await Organisation.find()

        if (organizations) {
            res.status(200).json({
                success: true,
                data: {
                    result: organizations,
                    message: null
                },
                error: null
            })
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Something went wrong"
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

//@des Update current funding organization
//@route PUT /api/organization/update
//@access private
const update = asyncHandler(async (req, res) => {
    const {id, name, director, address, number} = req.body

    try {
        const organization = await Organisation.findOne({"_id":id})

        if (organization) {

            Organisation.updateOne({
                    "_id": id
                },
                {
                    $set: {
                        "name": name ? name : organization.name,
                        "director": director ? director : organization.director,
                        "address": address ? address : organization.address,
                        "number": number ? number : organization.number
                    }
                }).then((organization) => {

                if (organization) {
                    Organisation.findOne({id})
                        .then((result) => {
                            res.status(200).json({
                                success: true,
                                data: {
                                    result: result,
                                    message: "Organization's details have been successfully updated"
                                }
                            })
                        })
                }
            })
        } else {
            res.status(404).json({
                success: false,
                data: null,
                error: {
                    message: "No such organization was found"
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

//@des Delete current funding organization
//@route DELETE /api/organization/delete
//@access private
const deleted = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        if (id) {
            Organisation.findByIdAndDelete({"_id":id}).then((result) => {
                res.status(200).json({
                    success: true,
                    data: {
                        result: null,
                        message: "The Organization successfully deleted"
                    },
                    error: null
                })
            })
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "The Organization not found"
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

//@des The offer to become funder
//@route POST /api/organization/offer
//@access public
const offer = asyncHandler(async (req, res) => {
    const {name, director, address, number, message} = req.body

    try {
        if (!name || !director || !address || !number || !message) {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "All fields are required"
                }
            })
        } else {
            const organizationExist = await OrganizationOffer.findOne({name})

            if (organizationExist) {
                res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "The same name offer already exist"
                    }
                })
            } else {
                const newOrganization = await OrganizationOffer.create(req.body)

                if (newOrganization) {
                    res.status(201).json({
                        success: true,
                        data: {
                            result: null,
                            message: "Your offer added successfully"
                        }
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Smoething went wrong"
            }
        })
    }
})

//@des Get organization's offers
//@route GET /api/organization/offer/get
//@access private
const getOffers = asyncHandler(async (req, res) => {
    try {
        const organizations = await OrganizationOffer.find()
        res.status(200).json({
            success: true,
            data: {
                result: organizations,
                message: null
            },
            error: null
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

//@des Confirm organization's offer
//@route POST /api/organization/offer/confirm
//@access private
const confirmOffer = asyncHandler(async (req, res) => {
    const {id} = req.body

    try {
        if (id) {
            const organization = await OrganizationOffer.findOne({id})
            const {name, director, email, address, number} = organization
            if (organization) {
                const newOrganization = await Organisation.create({
                    name, director, email, address, number
                })

                if (newOrganization) {
                    await OrganizationOffer.findOneAndDelete({id})

                    res.status(201).json({
                        success: true,
                        data: {
                            result: null,
                            message: "The new Organization added successfully"
                        },
                        error: null
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        data: null,
                        error: {
                            message: "The new Organization didn't added, something went wrong"
                        }
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "The Organization offer didn't found"
                    }
                })
            }
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "The Organization id is required"
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

//@des Refuse organization's offer
//@route DELETE /api/organization/offer/refuse
//@access private
const refuseOffer = asyncHandler(async (req, res) => {
    const {id} = req.body

    try {
        if (id) {
            await OrganizationOffer.findOneAndDelete({id})

            res.status(200).json({
                success: true,
                data: {
                    result: null,
                    message: "The Organization offer successfully refused"
                },
                error: null
            })

        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "The Organization id is required"
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: {
                message: "Something went wrong"
            }
        })
    }
})

module.exports = {
    create,
    get,
    update,
    deleted,
    offer,
    getOffers,
    confirmOffer,
    refuseOffer
}