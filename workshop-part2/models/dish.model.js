const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");

const dishesDataPath = path.join(__dirname, "..", "database", "dishes.json");

// CRUD Operations:

class DishesModel {
  //1.Get all dishes:
  static async getAllDishes() {
    return DataService.readJSONFile(dishesDataPath);
  }
  //2.Get dish by id:
  static async getDishById(dishId) {
    const dishes = await this.getAllDishes();

    const foundDish = dishes.find((dish) => dish.id === dishId);

    if (foundDish) {
      return foundDish;
    } else {
      return Promise.reject({ msg: "No dish found." });
    }
  }
  //3. Add new dishes:
  static async addNewDish(newDishData) {
    const dishes = await this.getAllDishes();

    const dishExist = dishes.some((dish) => dish.name === newDishData.name);

    if (dishExist) return Promise.reject({ msg: "Dish already exist." });

    const newDish = {
      ...newDishData,
      id: uuid(),
    };

    const updatedDishes = [...dishes, newDish];

    await DataService.saveJSONFile(dishesDataPath, updatedDishes);

    return newDish;
  }
  //4. Update dish:
  static async patchDish(dishId, dishUpdatedData) {
    const dishes = await this.getAllDishes();

    const foundDish = await this.getDishById(dishId);

    const updatedDish = { ...foundDish, ...dishUpdatedData };

    const updatedDishes = dishes.map( dish =>
      dish.id === foundDish.id ? updatedDish : dish
    );

    await DataService.saveJSONFile(dishesDataPath, updatedDishes);
  }
  //5. Delete dish:
  static async deleteDish(dishId) {
    const dishes = await this.getAllDishes();

    const updatedDishes = dishes.filter(
        dish => dish.id !== dishId
    );

    if (updatedDishes.length === dishes.length)
      return Promise.reject({ msg: "Dish not found." });

    await DataService.saveJSONFile(dishesDataPath, updatedDishes);
  }
}


module.exports = DishesModel;