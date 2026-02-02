import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFilterCategoriesId,
  updateFilterStatus,
} from '../slices/todoSlice';

import styles from '../styles/modules/app.module.scss';
import Button, { SelectButton } from './Button';
import CategoryManager from './CategoryManager';
import TodoModal from './TodoModal';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [catManagerOpen, setCatManagerOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const [filterCategoriesId, setFilterCategoriesId] = useState('all');
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.todo.categories);

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  const updateCategoryFilter = (e) => {
    setFilterCategoriesId(e.target.value);
    dispatch(updateFilterCategoriesId(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>

      <div>
        <p className={styles.filterText}>Category:</p>
        <SelectButton
          id="category"
          onChange={(e) => updateCategoryFilter(e)}
          value={filterCategoriesId}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              style={{ color: category.color }}
            >
              {category.name}
            </option>
          ))}
        </SelectButton>
        <Button
          variant="primary"
          onClick={() => setCatManagerOpen(true)}
          style={{ marginLeft: '10px' }}
        >
          ≡
        </Button>
        {/* <span>{filterCategoriesId}</span> */}
      </div>

      <div>
        <p className={styles.filterText}>Status:</p>
        <SelectButton
          id="status"
          onChange={(e) => updateFilter(e)}
          value={filterStatus}
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Completed</option>
        </SelectButton>

        <TodoModal
          type="add"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        <CategoryManager
          isOpen={catManagerOpen}
          onClose={() => setCatManagerOpen(false)}
        />
      </div>
    </div>
  );
}

export default AppHeader;
