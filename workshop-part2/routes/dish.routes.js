const router = require("express").Router();
const DishController = require("../controllers/dish.controller");  

router.get("/all", DishController.fetchAllDishes);
router.get("/:id", DishController.fetchDishesById);
router.post("/add", DishController.createNewDish);
router.patch("/:id/update", DishController.updateDish);
router.delete("/:id", DishController.deleteDish);

module.exports = router;