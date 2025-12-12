import { HTTP_CODE } from "@/shared/constants";
import { catchAsync, sendResponse } from "@/shared/util";

export const notFound = catchAsync(async (_, res) => {
  sendResponse(res, {
    success: false,
    status: HTTP_CODE.NOT_FOUND,
    message: "Route not found!",
  });
});
