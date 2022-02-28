'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipes', [
      {
        title: 'Italian Chips',
        minutes: 26,
        servings: 12,
        ingredients: 4,
        ingredientsList:
          '<ul><li>12 wonton wrappers</li><li>1 egg white, beaten</li><li>½ teaspoon crumbled dried oregano</li><li>¾ cup freshly grated Parmigiano-Reggiano cheese</li></ul>',
        instructions:
          '<ol><li>Preheat oven to 400 degrees F (200 degrees C). Prepare a baking sheet with cooking spray.</li><li>Arrange the wonton wrappers on the baking sheet in a single layer. Brush each wrapper with egg white; sprinkle with oregano and Parmigiano-Reggiano cheese. Cut each into two triangles using a pizza cutter.</li><li>Bake in the preheated oven until the edges are brown, 6 to 7 minutes. Transfer to a cooling rack to cool completely. Store in an airtight container up to 2 days.</li></ol>',
        thumbnail: 'thumbnail-1.png',
        userId: 1,
        categoryId: 1,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Italian Pizza Crust in Bread Machine',
        minutes: 110,
        servings: 8,
        ingredients: 8,
        ingredientsList:
          '<ul><li>1 cup warm water (110 degrees F/45 degrees C)</li><li>1 (.25 ounce) package active dry yeast</li><li>1 teaspoon white sugar</li><li>2 ½ cups whole wheat flour</li><li>2 tablespoons olive oil</li><li>1 ½ teaspoons dried basil</li><li>1 ½ teaspoons dried oregano</li><li>1 teaspoon salt</li></ul>',
        instructions:
          '<ol><li>Combine warm water, yeast, and sugar together in the pan of a bread machine. Let stand until the yeast softens and begins to form a creamy foam, about 10 minutes.</li><li>Pour flour, olive oil, basil, oregano, and salt over the yeast mixture. Place bread machine bowl in the bread machine.</li><li>Select the Dough setting and press Start.</li></ol>',
        thumbnail: 'thumbnail-2.png',
        userId: 2,
        categoryId: 1,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Italian Lasagna',
        minutes: 120,
        servings: 15,
        ingredients: 15,
        ingredientsList:
          '<ul><li>9 thick slices bacon, diced</li><li>1 onion, chopped</li><li>1 teaspoon fennel seed</li><li>1 teaspoon dried oregano</li><li>1 ½ teaspoons Italian seasoning</li><li>2 (28 ounce) cans tomato sauce</li><li>2 pounds Italian sausage</li><li>1 (16 ounce) package lasagna noodles</li><li>2 pints part-skim ricotta cheese</li><li>2 eggs</li><li>2 teaspoons chopped fresh parsley</li><li>1 teaspoon dried oregano</li><li>⅓ cup milk</li><li>8 slices provolone cheese</li><li>6 cups shredded mozzarella cheese</li></ul>',
        instructions:
          '<ol><li>Brown bacon and onion in a large pan over medium heat. Stir in fennel seed, 1 teaspoon oregano, Italian seasoning, and tomato sauce. Cover, and simmer on low for 4 to 6 hours, or until thick.</li><li>Brown sausage links in a large skillet. Drain on paper towels. Cut into 1 inch pieces.</li><li>Mix together ricotta cheese, egg, milk, parsley, and 1 teaspoon oregano in a medium bowl.</li><li>Layer 1 cup of sauce on the bottom of a 9 x 13 inch pan. Layer with 1/3 uncooked lasagna noodles, 1/2 ricotta cheese mixture, 1/2 sausage pieces, 1/3 mozzarella, and 1/2 provolone cheese. Top with 1/3 sauce. Repeat layers. Top with remaining 1/3 noodles. Spread remaining sauce over the top, and sprinkle with remaining 1/3 mozzarella cheese.</li><li>Bake at 350 degrees F (175 degrees C) for 1 1/2 hours.</li></ol>',
        thumbnail: 'thumbnail-3.png',
        userId: 3,
        categoryId: 1,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Homemade Italian Beef',
        minutes: 370,
        servings: 6,
        ingredients: 5,
        ingredientsList:
          '<ul><li>3 pounds beef chuck roast</li><li>3 (1 ounce) packages dry Italian salad dressing mix</li><li>1 cup water</li><li>1 (16 ounce) jar pepperoncini peppers</li><li>8 hamburger buns, split</li></ul>',
        instructions:
          '<ol><li>Place the roast into a slow cooker, and season with Italian dressing mix. Pour in the water. Cover, and cook on High for 6 to 7 hours. During the last hour, shred the meat with two forks - if it does not shred easily, cook longer. Add the peppers, and as much of the juice as you like for additional flavor. Serve on buns.</li></ol>',
        thumbnail: 'thumbnail-4.png',
        userId: 4,
        categoryId: 1,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Italian "Stuffed" Toast (Toast Farcito)',
        minutes: 13,
        servings: 2,
        ingredients: 5,
        ingredientsList:
          '<ul><li>2 slices prosciutto</li><li>2 slices fontina cheese</li><li>4 slices thinly sliced sandwich bread</li><li>¼ cup chopped giardiniera (pickled Italian vegetables)</li><li>2 hot pickled peppers (Optional)</li></ul>',
        instructions:
          "<ol><li>Heat a panino press according to the manufacturer's instructions.</li><li>Place 1 slice prosciutto and 1 slice fontina cheese onto a slice of bread; repeat with remaining prosciutto, fontina cheese, and slice of bread. Add 1/2 of the giardiniera on top of each cheese layer and top sandwiches with remaining bread slices, creating 2 sandwiches.</li><li>Cook each panino in the press until the cheese has melted and the bread has toasted, about 3 minutes. Serve with hot pickled peppers on the side.</li></ol>",
        thumbnail: 'thumbnail-5.png',
        userId: 5,
        categoryId: 1,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Asian Grilled Flank Steak',
        minutes: 180,
        servings: 8,
        ingredients: 13,
        ingredientsList:
          '<ul><li>1 medium orange, cut into quarters</li><li>1 lemon, juiced and zested</li><li>1 cup orange juice</li><li>¼ cup rice vinegar</li><li>¼ cup soy sauce</li><li>¼ cup maple syrup</li><li>¼ cup honey</li><li>4 cloves garlic</li><li>1 tablespoon grated fresh ginger root</li><li>1 tablespoon ground black pepper</li><li>1 teaspoon cayenne pepper</li><li>4 green onions, cut into 1/4-inch pieces</li><li>2 pounds flank steak</li></ul>',
        instructions:
          '<ol><li>Combine orange pieces, lemon juice, lemon zest, orange juice, rice vinegar, soy sauce, maple syrup, honey, garlic cloves, ginger, pepper, and cayenne pepper in a blender; blend until marinade is smooth. Mix in green onions.</li><li>Place flank steak into a shallow baking dish and pour marinade over meat, making sure marinade gets underneath the meat as well. Cover the dish, refrigerate, and marinate for at least 2 hours, or overnight.</li><li>Remove steak from the refrigerator and allow to come to room temperature for at least 30 minutes before grilling. Lift up steak from the dish to let juices run off; reserve marinade.</li><li>Preheat an outdoor grill for medium-high heat and lightly oil the grate.</li><li>Cook flank steak on the preheated grill until it begins to firm and is reddish-pink and juicy in the center, 5 to 7 minutes per side. An instant-read thermometer inserted into the center should read 130 degrees F (54 degrees C).</li><li>Cover steak and set aside to rest for 10 minutes before slicing thinly against the grain.</li><li>While steak is resting, pour remaining marinade in a saucepan over medium-high heat and bring to a boil. Cook until sauce is reduced, about 5 minutes. Serve with the flank steak.</li></ol>',
        thumbnail: 'thumbnail-6.png',
        userId: 1,
        categoryId: 2,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Asian Back Ribs',
        minutes: 260,
        servings: 4,
        ingredients: 8,
        ingredientsList:
          '<ul><li>2 racks Fresh Pork Baby Back Ribs, cut into 3- to 4-rib sections</li><li>2 cups hoisin sauce</li><li>¼ cup rice wine vinegar</li><li>4 cloves garlic, minced</li><li>3 tablespoons minced fresh ginger</li><li>1 tablespoon red chili flakes</li><li>2 teaspoons brown sugar</li><li>3 tablespoons chopped scallions or green onions</li></ul>',
        instructions:
          '<ol><li>Mix together all ingredients except ribs and scallions. Place rib pieces in resealable plastic bag; pour about 3/4 marinade over ribs. Seal bag and refrigerate for 2 hours or up to overnight. The longer you can marinate, the longer the flavors have time to work into the ribs.</li><li>Heat oven to 325 degrees F. Remove rib pieces from marinade and place on a large enough piece of aluminum foil to loosely encase ribs. Spoon some of the marinade over the ribs; fold foil over ribs and seal.</li><li>Place rib package in roasting pan and place in the 325 degree F. oven. Cook until ribs are tender, about 2 hours.</li><li>Turn oven up to 450 degrees F. Remove ribs from foil and place back on roasting pan, meat side up. Return ribs to oven and roast until nicely browned and glazed.</li><li>Coat ribs with reserved marinade and sprinkle with scallions. Serve with jasmine rice.</li></ol>',
        thumbnail: 'thumbnail-7.png',
        userId: 2,
        categoryId: 2,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        title: 'Grilled Asian Ginger Pork Chops',
        minutes: 135,
        servings: 6,
        ingredients: 8,
        ingredientsList:
          '<ul><li>½ cup orange juice</li><li>2 tablespoons soy sauce</li><li>2 tablespoons minced fresh ginger root</li><li>2 tablespoons grated orange zest</li><li>1 teaspoon minced garlic</li><li>1 teaspoon garlic chile paste</li><li>½ teaspoon salt</li><li>6 pork loin chops, 1/2 inch thick</li></ul>',
        instructions:
          '<ol><li>In a shallow container, mix together orange juice, soy sauce, ginger, orange zest, garlic, chile paste, and salt. Add pork chops, and turn to coat evenly. Cover, and refrigerate for at least 2 hours, or overnight. Turn the pork chops in the marinade occasionally.</li><li>Preheat grill for high heat, and lightly oil grate.</li><li>Grill pork chops for 5 to 6 minutes per side, or to desired doneness.</li></ol>',
        thumbnail: 'thumbnail-8.png',
        userId: 3,
        categoryId: 2,
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {})
  },
}
