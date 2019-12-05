const fetchStudents = async() => {
    const response = await fetch('https://www.hatchways.io/api/assessment/students');
    return await response.json()
}

export default fetchStudents