import React from 'react';

import './App.css';
import fetchStudents from './services/studentService';
import { Card } from './components/Card';
import StudentProfile from './components/StudentProfile';
import { TextField } from './components/TextField';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students : [],
      filteredStudents: [],
      nameFilter: '',
      tagFilter: ''
    };
  }

  componentDidMount() {
    this.loadStudents()
  }

  async loadStudents() {
    const students = await fetchStudents();
    this.setState({students : students.students, filteredStudents: students.students});
  }
  
  updateNameFilter(e) {
    this.setState({nameFilter: e.target.value});
    this.filterByName(e.target.value)
  }

  filterByName(filter, seqUpdate = false) {
    let filteredStudents = seqUpdate ? seqUpdate : this.state.students;

    filteredStudents = filteredStudents.filter(student => {
      const name = student.firstName.toLowerCase() + student.lastName.toLowerCase();

      return name.indexOf(filter.toLowerCase()) !== -1;

    });
    
    if(this.state.tagFilter && !seqUpdate) {
      this.filterByTag(this.state.tagFilter, filteredStudents);
    } else {
      this.setState({filteredStudents});
    }
  }

  updateTagFilter(e) {
    this.setState({tagFilter: e.target.value});
    this.filterByTag(e.target.value);
  }

  filterByTag(filter, seqUpdate = false) {
    let filteredStudents = seqUpdate ? seqUpdate : this.state.students;

    filteredStudents = filteredStudents.filter(student => {
      if(!student.tags && filter) return false;
      if(!filter) return true;
      const tags = student.tags.join('')
      return tags.indexOf(filter.toLowerCase()) !== -1;
    });

    if(this.state.nameFilter && !seqUpdate) {
      this.filterByName(this.state.nameFilter, filteredStudents);
    } else {
      this.setState({filteredStudents});
    }
  }

  addTag(tag, id) {
    const idx = id - 1;

    let students = this.state.students;

    if(!students[idx].tags) {
      students[idx].tags = [tag]
    } else {
      students[idx].tags.push(tag)
    }
    
  }

  render() {
    return (
      <div className="App">
        <Card>
          <TextField width='90%' value={this.state.nameFilter} placeholder="Search by name" type="text" id="name-input"  onChange={this.updateNameFilter.bind(this)}/>
          <TextField width='90%' value={this.state.tagFilter} placeholder="Search by tags" type="text" id="tag-input" onChange={this.updateTagFilter.bind(this)}/>
          {this.state.filteredStudents.map(student => 
            <StudentProfile key={student.id} student={student} addTag={(tag) => this.addTag(tag, student.id)}></StudentProfile>
          )}
        </Card>
      </div>
    )
  };
}

export default App;
