import React, { useEffect } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import axios from "axios";

interface Data {
  username: string;
  name: string;
  adcount: number;
  ranking: number;
  /*  searchterms:[string]; */
  dob: string;
  gender: string;
  password: string;
  location: [number, number];
  type: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: any, comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map(
    (el: T, index: number) => [el, index] as [T, number]
  );
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  /* { id: "adcount", numeric: true, disablePadding: false, label: "Ad Count" }, */
  /*  {
    id: "ranking",
    numeric: true,
    disablePadding: false,
    label: "Political Ranking",
  }, */
  { id: "dob", numeric: false, disablePadding: false, label: "DOB" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
  { id: "password", numeric: false, disablePadding: false, label: "Password" },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
  },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    order,
    orderBy,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.id === "username" ? "left" : "center"}
            align="left"
            padding={headCell.disablePadding ? "default" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Bots
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("adcount");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bots, setBots] = React.useState([]);

  useEffect(() => {
    axios.get("/bots").then((res) => {
      setBots(res.data);
    });
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, bots.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? "small" : "medium"}
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={bots.length}
            />
            <TableBody style={{ maxHeight: 525, overflow: "auto" }}>
              {stableSort(bots, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={Math.random()}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='default'
                        align='left'
                      >
                        {row.username}
                      </TableCell>
                      <TableCell align='left'>
                        {row.fName + " " + row.lName}
                      </TableCell>
                      {/*  <TableCell align='center'>{row.adcount}</TableCell> */}
                      {/* <TableCell align='center'>{row.ranking}</TableCell> */}
                      <TableCell align='left'>{row.dob}</TableCell>
                      <TableCell align='left'>{row.gender}</TableCell>
                      <TableCell align='left'>{row.password}</TableCell>
                      <TableCell align='left'>
                        {row.locLat + ", " + row.locLong}
                      </TableCell>
                      <TableCell align='left'>{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={bots.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </div>
  );
}
