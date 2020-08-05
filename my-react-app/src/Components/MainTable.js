import React, { useState, useEffect } from 'react';
import {
   Select, 
   MenuItem,
   makeStyles,
   InputLabel,
   FormControl} from '@material-ui/core'
import {
   SortingState,
   PagingState,
   FilteringState,
   CustomPaging,
} from '@devexpress/dx-react-grid';
import {
   Grid,
   VirtualTable,
   TableHeaderRow,
   TableFilterRow,
   PagingPanel,
   TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import { Loading } from './loading';
import { Fragment } from 'react';

// const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true';
const URL = 'http://localhost:5000/select';

const useStyles = makeStyles((theme) => ({
   formControl: {
     margin: theme.spacing(2),
     marginLeft: theme.spacing(3),
     minWidth: 315,
   },
   selectEmpty: {
     marginTop: theme.spacing(2),
   },
 }));

export default () => {
   const classes = useStyles();
   // tablename states
   const [tablenames, setTablenames] = useState([])
   const [selectedTable, setSelectedTable] = useState('')
   // data states
   const [data, setData] = useState({ columns: [], rows: [] })
   // sortng state
   const [sorting, setSorting] = useState([]);
   // filtering state
   const [filters, setFilters] = useState([]);
   // paging states
   const [totalCount, setTotalCount] = useState(0);
   const [pageSize, setPageSize] = useState(5);
   const [pageSizes] = useState([5, 10, 15]);
   const [currentPage, setCurrentPage] = useState(0);
   // resizing states
   const [columnWidths, setColumnWidths] = useState([
      // { columnName: 'repo_url', width: 180 },
      // { columnName: 'application', width: 180 },
   ]);
   // loading states
   const [loading, setLoading] = useState(false);
   const [lastQuery, setLastQuery] = useState();

   // tablename-related functions
   const loadTablenames = async () => {
      try {
         const response = await fetch("http://localhost:5000/tables")
         const jsonData = await response.json()
         var newTablenames = []
         for (var obj of jsonData) {
            newTablenames.push(obj['tablename'])
         }
         setTablenames(newTablenames)
         if (newTablenames.length > 0) {
            setSelectedTable(newTablenames[0])
         }
      } catch (err) {
         console.error(err.message)
      }
   }

   const handleTableChange = (event) => {
      setSelectedTable(event.target.value)
      setData({ columns: [], rows: [] })
      setSorting([])
      setFilters([])
      setTotalCount(0)
      setPageSize(5)
      setCurrentPage(0)
      setColumnWidths([])
      setLoading(false)
      setLastQuery()
   }

   // dataloading-related functions
   const getQueryString = () => {
      let queryString = `${URL}?tablename=${selectedTable}`;
      // filtering part
      let filter = filters.reduce((acc, { columnName, value }) => {
         acc.push(`${columnName}::text LIKE ${encodeURIComponent("'%" + value +"%'")}`);
         return acc;
       }, []).join(' AND ');
   
       queryString = `${queryString}&filter=${filter}`;

      // sorting part
      if (sorting.length) {
         const sortingConfig = sorting
            .map(({ columnName, direction }) => ({
               selector: columnName,
               desc: direction === 'desc',
            }));
         const sortingStr = JSON.stringify(sortingConfig);
         queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
      }

      // paging part
      queryString = `${queryString}&take=${pageSize}&skip=${pageSize * currentPage}`
      // console.log(queryString)
      return queryString;
   };

   const loadData = async () => {
      
      const queryString = getQueryString();
      if (queryString !== lastQuery && !loading) {
         setLoading(true);
         try {
            
            const dataResponse = await fetch(queryString);
            const jsonData = await dataResponse.json();
            const colsResponse = await fetch(`http://localhost:5000/columns?tablename=${selectedTable}`)
            const jsonCols = await colsResponse.json()
            // setTotalCount
            setTotalCount(0)
            if (jsonData.length > 0) setTotalCount(Number(jsonData[0]['full_count']))
            for (var tmpObj1 in jsonData) {
               delete tmpObj1.full_count
            }
            // setColumns and setColumnWidths
            var colnames = []
            var colWidths = []
            for (var tmpObj2 of jsonCols) {
               var newObj1 = { name: tmpObj2['column_name'], title: tmpObj2['column_name'] }
               var newObj2 = { columnName: tmpObj2['column_name'], width: 200 }
               colnames.push(newObj1)
               colWidths.push(newObj2)
            }
            setData({columns: colnames, rows: jsonData})
            // console.log(colWidths)
            setColumnWidths(colWidths)
            setLoading(false)
         } catch (error) {
            setLoading(false)
         }
         // fetch(queryString)
         //    .then(response => response.json())
         //    .then(response => console.log(response))
         //    .then(({ rows, totalCount: newTotalCount }) => {
         //       setRows(rows);
         //       setTotalCount(newTotalCount);
         //       setLoading(false);
         //    })
         //    .catch(() => setLoading(false));
         setLastQuery(queryString);
      }
   };

   // useEffect
   useEffect(() => {
      loadData();
   });
   useEffect(() => {
      loadTablenames();
   }, []);

   return (
      <Fragment>
         <FormControl className={classes.formControl}>
            <InputLabel id="select-label">Tablename</InputLabel>
            <Select value={selectedTable} onChange={handleTableChange}>
               {tablenames.map((tablename, index) =>
                  <MenuItem key={index} value={tablename}>{tablename}</MenuItem>
               )}
            </Select>
         </FormControl>
         <Grid
            rows={data.rows}
            columns={data.columns}
         >
            <SortingState
               sorting={sorting}
               onSortingChange={setSorting}
            />
            <PagingState
               currentPage={currentPage}
               onCurrentPageChange={setCurrentPage}
               pageSize={pageSize}
               onPageSizeChange={setPageSize}
            />
            <FilteringState
          onFiltersChange={setFilters}
        />
            <CustomPaging
               totalCount={totalCount}
            />
            <VirtualTable
               height={440}
            />
            <TableColumnResizing
               columnWidths={columnWidths}
               onColumnWidthsChange={setColumnWidths}
            />
            <TableHeaderRow showSortingControls />
            <TableFilterRow />
            <PagingPanel
               pageSizes={pageSizes}
            />
         </Grid>
         {loading && <Loading />}
      </Fragment>
   );
};
