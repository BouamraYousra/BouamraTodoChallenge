import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useDeleteTodo, useFetchTodos, useUpdateTodoStatus } from 'src/hooks/use-todo-requests';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import AddTodoPopup from '../add-todo-popup';
import TodoTableRow from '../todo-table-row';
import TodoTableHead from '../todo-table-head';
import TableEmptyRows from '../table-empty-rows';
import ModifyTodoPopup from '../modify-todo-popup';
import TodoTableToolbar from '../todo-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


export default function TodoPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [todosData, setTodosData] = useState([]);

  const { fetchTodos } = useFetchTodos();

  const { deleteTodo } = useDeleteTodo();

  const { updateTodoStatus } = useUpdateTodoStatus();

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      if (data) setTodosData(data);
    };
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowsClick = async (event, todoId, currentStatus, content) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      console.log('New status:', content);
      const updated= JSON.stringify({ todoId,content,newStatus })
      const updatedTodo = await updateTodoStatus(updated);
      if (updatedTodo) {
        const updatedTodos = todosData.map(todo => {
          if (todo.id === todoId) {
            return {todoId,content, status: newStatus};
          }
          return todo;
        });
        console.log('Updated todos:', updatedTodos);
        setTodosData(updatedTodos);
        

      }
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = todosData.map((n) => n.name);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };







  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = async (event, id) => {
    const data = await deleteTodo(id)
    if (data) setTodosData(data);
  }
  const handleEdit = async (event, id) => {
    const data = await deleteTodo(id)
    if (data) setTodosData(data);
  }


  const dataFiltered = applyFilter({
    inputData: todosData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <AddTodoPopup setTodosData={setTodosData} />
      <Card>
        <TodoTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TodoTableHead
                order={order}
                orderBy={orderBy}
                rowCount={todosData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'content', label: 'To do content' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TodoTableRow
                      key={row.id}
                      content={row.content}
                      status={row.status}
                      selected={selected.indexOf(row.content) !== -1}
                      handleClick={(event) => handleClick(event, row.content)}
                      handleDelete={(event) => handleDelete(event, row.id)}
                      handleRowsClick={(event) => handleRowsClick(event, row.id, row.status,row.content)}
                      handleEdit={(event) => handleEdit(event, row.id)}
                    />
                  ))}

               
                  <ModifyTodoPopup

                  // Pass other props as needed
                  />
                
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, todosData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={todosData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
