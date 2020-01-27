import React from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from 'react-mdl';
import { removeStudent, selectStudent, getAllStudents } from '../../store/actions/studentActions'
import { connect } from 'mongodb';

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

class ProjectListToUpdate extends React.Component {

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

    deleteStudent = (item) => {
        console.log(item)
        this.props.removeStudent(item._id)
    }
    handleUpdate = (student) => {
        console.log(student)
        this.props.selectStudent(student)
      }

    render () {
        const studentsFetched = this.state.allStudents
            return (
                <div>
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
                            <StyledTableCell align="left">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            studentsFetched.map((student, index) => (
                                <StyledTableRow key={index} hover>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {student.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{student.email}</StyledTableCell>
                                    <StyledTableCell align="left">{student.phone}</StyledTableCell>
                                    <StyledTableCell align="left">{student.cash}</StyledTableCell>
                                    <StyledTableCell align="left">{student.level}</StyledTableCell>
                                    <StyledTableCell align="left">{student.time}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button
                                            type="button" 
                                            className = "btn blue lighten-1"
                                            onClick = { () => this.handleUpdate(student) }
                                        >
                                            UPDATE
                                        </Button>
                                        <Button
                                            type="button" 
                                            className = "btn red lighten-1"
                                            onClick = { () => this.deleteStudent(student) }
                                        >
                                            DELETE
                                        </Button>
                                    </StyledTableCell>
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
    return {
        allStudents: state.studentReducer.allStudents
    }
}

export default connect(mapStateToProps, { removeStudent, selectStudent, getAllStudents })(ProjectListToUpdate);