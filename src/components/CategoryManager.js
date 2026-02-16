import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/modules/categoryManager.module.scss';
import Button from './Button';
import CategoryItem from './CategoryItem';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function CategoryManager({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.todo.categories);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.managerWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.managerContainer}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => onClose(false)}
              onClick={() => onClose(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <h1 className={styles.managerTitle}>Category Manager</h1>

            <div className={styles.categoryItemWrapper}>
              {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>

            <div className={styles.newCategoryForm}>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  placeholder="Enter category name..."
                  className={styles.categoryInput}
                />
                <input
                  type="color"
                  defaultValue="#000000"
                  className={styles.categoryColorpicker}
                />
                <Button variant="primary" className={styles.addCategoryButton}>
                  +
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CategoryManager;
