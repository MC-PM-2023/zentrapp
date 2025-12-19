import { showLoginActivity } from "../models/logactivitymodel.js";

export const getLoginActivity = async (req, res) => {
    try {
        const logs = await showLoginActivity();

        return res.status(200).json({
            message: "Login activity fetched successfully",
            data: logs
        });

    } catch (error) {
        console.error("Error fetching login activity:", error);
        return res.status(500).json({
            message: "Error fetching login activity",
            error: error.message
        });
    }
};
