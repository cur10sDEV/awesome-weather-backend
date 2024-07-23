import logger from "@/configs/logger";
import { CityRepo } from "@/repositories/city.repo";

export class CityService {
  static async getCityById(id: string) {
    try {
      const city = await CityRepo.getCityById(id);

      if (!city) {
        return null;
      }

      return city;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
