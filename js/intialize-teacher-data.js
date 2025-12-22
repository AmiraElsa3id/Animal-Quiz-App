// Initialize teachers on first load
function initializeTeachersData() {
  if (!localStorage.getItem('teachers')) {
    const teachersData = [
      {
        "id": "t1",
        "username": "sarah_johnson",
        "password": "teacher123",
        "role": "teacher",
        "course": "Animal Expert",
        "profilePicture": "https://randomuser.me/api/portraits/women/44.jpg",
        "darkMode": false
      },
      {
        "id": "t2",
        "username": "michael_brown",
        "password": "teacher456",
        "role": "teacher",
        "course": "Planets Expert",
        "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg",
        "darkMode": true
      },
      {
        "id": "t3",
        "username": "emily_davis",
        "password": "teacher789",
        "role": "teacher",
        "course": "Plants Expert",
        "profilePicture": "https://randomuser.me/api/portraits/women/68.jpg",
        "darkMode": false
      },
      {
        "id": "t4",
        "username": "david_wilson",
        "password": "teacher321",
        "role": "teacher",
        "course": "Dog Breeds Expert",
        "profilePicture": "https://randomuser.me/api/portraits/men/52.jpg",
        "darkMode": true
      }
    ];
    
    localStorage.setItem('teachers', JSON.stringify(teachersData));
    console.log('Teachers data initialized!');
  }
}

// Run on page load
initializeTeachersData();
