const DishModel = require("../models/dish.model");

class DishController {
  //Get all dishes:
  static async fetchAllDishes(req, res) {
    try {
      const dishes = await DishModel.getAllDishes();
      res.status(200).send(dishes);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //Get dishes by id:
  static async fetchDishesById(req, res) {
    try {
      const { id: dishId } = req.params;

      const dishes = await DishModel.getDishById(dishId);
      res.status(200).send(dishes);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //Add new dishes:
  static async createNewDish(req, res) {
    try {
      const newDishData = req.body;

      const createdDish = await DishModel.addNewDish(newDishData);

      res.status(201).send(createdDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //Update dish:
  static async updateDish(req, res) {
    try {
      const dishId = req.params.id;
      const dishUpdates = req.body;

      if (dishUpdates.id)
        return res.status(400).send({ msg: "Invalid update" });

       DishModel.patchDish(dishId, dishUpdates);

      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //Delete dish:
  static async deleteDish(req, res) {
    try {
      const dishId = req.params.id;
      await DishModel.deleteDish(dishId);

      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = DishController;
