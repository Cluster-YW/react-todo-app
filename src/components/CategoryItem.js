import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function CategoryItem({ category, todoCount, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editColor, setEditColor] = useState(category.color);

  return (
    <motion.div className={styles.item} variants={child}>
      <div className={styles.todoText} style={{ color: category.color }}>
        <p>{category.name}</p>
      </div>
      <div className={styles.todoDetails}>{todoCount}</div>
      <div className={styles.todoActions}>
        <div className={styles.icon} tabIndex={0} role="button">
          <MdDelete />
        </div>
        <div className={styles.icon} tabIndex={0} role="button">
          <MdEdit />
        </div>
      </div>
    </motion.div>
  );
}

export default CategoryItem;
