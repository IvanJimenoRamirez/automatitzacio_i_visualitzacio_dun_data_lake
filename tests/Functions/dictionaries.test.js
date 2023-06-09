const { getDictionary } = require("../../app/[lang]/dictionaries");

describe('Dictionaries', () => {
    test('getDictionary', async () => {
        const dict = await getDictionary('en-US');
        expect(dict).toEqual({
                "navbar": {
                    "home": "Home",
                    "tlz": "Temporal Landing Zone",
                    "lz": "Landing Zone",
                    "fz": "Formatted Zone",
                    "projects": "Projects",
                    "profile": "Profile",
                    "admin": "Admin",
                    "logout": "Logout"
                },
                "header": {
                    "language": "Select language",
                    "welcomeBack": "Welcome back"
                },
                "footer": {
                    "privacyPolicy": "Privacy policy"
                },
                "page": {
                    "login": {
                        "title": "Login",
                        "description": "Welcome to the Data Lake management application",
                        "user": "Username",
                        "password": "Password",
                        "start": "Start",
                        "error": "Incorrect username or password. Status code: "
                    },
                    "home": {
                        "title": "Data Lake management",
                        "zones": {
                            "sources": "Sources",
                            "data": "Data",
                            "name": "Zones",
                            "description": "Data lake zones. Summary of contents",
                            "tlz": {
                                "name": "Temporal Landing Zone",
                                "description": "Some statistics about the Temporal Landing Zone"
                            },
                            "lz": {
                                "name": "Landing Zone",
                                "description": "Some statistics about the Landing Zone"
                            },
                            "fz": {
                                "name": "Formatted Zone",
                                "description": "Some statistics about the Formatted Zone"
                            }
                        },
                        "sources": {
                            "name": "Data sources",
                            "description": "Registered data sources",
                            "columns": {
                                "name": "Name",
                                "providedData": "Provided Data"
                            }
                        }
                    },
                    "temporalLandingZone": {
                        "title": "Temporal Landing Zone",
                        "description": "Set of operations available in the Temporal Landing Zone"
                    },
                    "landingZone": {
                        "title": "Landing Zone",
                        "description": "Set of operations available in the Landing Zone"
                    },
                    "formattedZone": {
                        "title": "Formatted Zone",
                        "description": "Set of operations available in the Formatted Zone"
                    },
                    "projects": {
                        "title": "Projects",
                        "description": "Projects in the Data Lake",
                        "projectsList": "Projects list"
                    },
                    "project": {
                        "name": "Project",
                        "description": "Set of operations available for the project"
                    },
                    "profile": {
                        "title": "Profile",
                        "subtitle": "User profile",
                        "description": "User profile and settings",
                        "info": "User information",
                        "userData": {
                            "name":"Name",
                            "email": "Email",
                            "role": "Role",
                            "password": "Password",
                            "changePassword": "Change password"
                        },
                        "modal": {
                            "oldPassword": "Actual password",
                            "newPassword": "New password",
                            "repeatNewPassword": "Repeat new password",
                            "changePassword": "Change password"
                        },
                        "missmatchPassword": "The new password and the repeat password must be the same"
                    },
                    "admin": {
                        "title": "Admin",
                        "subtitle": "Administration Pannel",
                        "description": "Manage Data Lake authentication",
                        "add": "Add",
                        "delete": "Delete",
                        "edit": "Edit",
                        "copy": "Copy",
                        "permissions": "Permissions",
                        "manageUsers": {
                            "edit": "Edit user",
                            "create": "Create user",
                            "delete": "Delete user",
                            "permissions": "Manage permissions",
                            "deleteConfirmation": "Are you sure you want to delete the user: ",
                            "title": "Manage users",
                            "list": "Users list",
                            "new": "New user",
                            "zones": "Zones",
                            "projects": "Projects"
                        },
                        "manageApiKeys": {
                            "delete": "Delete API Key",
                            "deleteConfirmation": "Are you sure you want to delete the API Key: ",
                            "title": "Manage API Keys",
                            "list": "API Keys list ",
                            "new": "New API Key",
                            "copySuccess": "API Key copied to clipboard"
                        },
                        "endpointConfig": {
                            "title": "Endpoint configuration",
                            "description": "Reloads the endpoints available on the web page based on the endpoints available in the current version of Data Lake",
                            "refresh": "Reload endpoints",
                            "success": "The endpoints have been reloaded successfully",
                            "error": "An error has occurred while reloading the endpoints. Status code: "
                        }
                    },
                    "endpoint": {
                        "title": "Execute the endpoint",
                        "description": "Description",
                        "configuration": "Configure the required parameters",
                        "execute": {
                            "execute":"Execute",
                            "confirm": "Are you sure you want to execute the endpoint?",
                            "method": "Method",
                            "schedule": "Schedule execution",
                            "missingDate": "You must select a date and hour to schedule the execution",
                            "startDate": "Start date",
                            "repeat": "Repeat every (seconds)",
                            "response": "Response to the request"
                        },
                        "parameterErrors": {
                            "parameter": "The parameter: ",
                            "numeric": " must be numeric",
                            "required": " is required"
                        },
                        "activeJob": "Job running",
                        "selectFile": "Select a file",
                        "fileNotUploaded": "No file has been selected"
                    },
                    "privacyPolicy": {
                        "title": "Privacy Policy",
                        "content": {
                            "title": "General Data Protection Regulation (GDPR)",
                            "welcomeUser": "Dear user,",
                            "welcomeContent": "Your privacy is important to us. That is why we are committed to complying with the European Union's General Data Protection Regulation (GDPR).",
                            "recolectedData": "We require and use the following personal data for the correct operation of the platform:",
                            "data" : {
                                "name": "Name",
                                "email": "Email",
                                "password": "Password"
                            } ,
                            "dataUsage": "This data is collected exclusively to enable you to log in and use our platform. The password you provide is kept encrypted in our database and is not used for any other purpose. We do not use your personal data for internal processes or share it with third parties without your explicit consent.",
                            "thanksUser": "Thank you for your trust. If you have any questions about our privacy policy, please do not hesitate to contact the system administrator."
                        }
                    }
                },
                "commons": {
                    "notEnoughPermissions": "You do not have enough permissions to access this page",
                    "fileDownloaded": "File downloaded",
                    "success": "Success",
                    "name": "Name",
                    "action": "Action",
                    "noContent": "No content",
                    "response": "Response",
                    "error": "Error",
                    "status": "Status",
                    "result": "Result",
                    "cancel": "Cancel",
                    "change": "Change",
                    "select": "Select",
                    "loading": "Loading...",
                    "operations": "Operations",
                    "list": "List",
                    "endpointTable": {
                        "listOperations": "List of available operations",
                        "filter": "Filter",
                        "filterDescription": "Apply a search on the available operations",
                        "search": "Search",
                        "method": "Method",
                        "applyFilters": "Apply Filters",
                        "noOperations": "No operations found",
                        "endpoint": "Endpoint",
                        "parameters": "Parameters",
                        "noParametersRequired": "No parameters required"
                    },
                    "errors": {
                        "title": "An error has occurred",
                        "status": "Status code",
                        "message": "Message"
                    }
                }
        });
    });
});