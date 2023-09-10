const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tag);
  }
  catch (err) {
    res.status(500).json({ message: 'not found' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!tag) {
      res.status(404).json({ message: "id not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'not found' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const update = await Tag.update(req.body, { where: { id: req.params.id } });
    !update[0] ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    !deleted ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
