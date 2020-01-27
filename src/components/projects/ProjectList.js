import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { getAllStudents, getAllStudentsSuccess } from '../../store/actions/studentActions'
import {connect} from 'mongodb';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 15,
    },
}))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);

const styles = makeStyles({
    table: {
      minWidth: 1500,
    },
});

class ProjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            name: '',
            email: '',
            phone: '',
            cash: '',
            level: '',
            time: '',
            allStudents: []
        }
    }

    componentDidMount() {
        this.props.getAllStudents()
    }

    deleteStudent = (item, e) => {
        axios.delete('http://localhost:5000/deleteone/' + item._id, item)
            .then((res) => {
                if(res.status === 200) {
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            allStudents: prevState.allStudents.filter((student) => student._id !== item._id)
                        }
                    })
                }
            })
            .catch((err) => console.log('error from delete: ',err))
    }

    handleUpdate = (item) => {
        const myData = {
          _id: item._id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          cash: item.cash,
          level: item.level,
          time: item.time,
          allStudents: item.allStudents
        }
        this.props.details((myData))
    }

    render () {
        const studentsFetched = this.state.allStudents
            return (
                <div className = "container">
                    <TableContainer component={Paper} className = {styles}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left"><b>Name</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Email</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Phone</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Cash</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Level</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Time</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    studentsFetched.map((student, index) => (
                                        <StyledTableRow key={index} hover>
                                            <StyledTableCell align="left">
                                                {student.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{student.email}</StyledTableCell>
                                            <StyledTableCell align="left">{student.phone}</StyledTableCell>
                                            <StyledTableCell align="left">{student.cash}</StyledTableCell>
                                            <StyledTableCell align="left">{student.level}</StyledTableCell>
                                            <StyledTableCell align="left">{student.time}</StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {        
        allStudents: state.studentReducer.allStudents
    }
}
export default connect(mapStateToProps, { getAllStudents, getAllStudentsSuccess })(ProjectList);