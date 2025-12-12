import { HTTP_CODE } from "../constants";
import { catchAsync, sendResponse } from "../util";

export const ping = catchAsync(async (req, res) => {
  sendResponse(res, { success: true, status: HTTP_CODE.OK, message: "pong" });
});
