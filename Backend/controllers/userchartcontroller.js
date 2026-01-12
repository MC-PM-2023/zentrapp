import { getUserAssignedChartApps } from "../models/userchartmodel.js";

export const getAssignedChart = async (req, res) => {
  try {
    const data = await getUserAssignedChartApps();

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data"
    });
  }
};
