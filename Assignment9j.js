document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    
 
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
        themeLabel.textContent = 'Dark Mode';
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            themeLabel.textContent = 'Dark Mode';
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            themeLabel.textContent = 'Light Mode';
            localStorage.setItem('darkMode', 'false');
        }
    });
    
   
    let timer;
    let timeLeft = 0;
    let isPaused = false;
    
    const timerInput = document.getElementById('timerInput');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerContainer = document.getElementById('timerContainer');
    const startBtn = document.getElementById('startTimer');
    const pauseBtn = document.getElementById('pauseTimer');
    const resumeBtn = document.getElementById('resumeTimer');
    const resetBtn = document.getElementById('resetTimer');
    
    function updateTimerDisplay() {
        timerDisplay.textContent = timeLeft.toString().padStart(2, '0');
        
       
        if (timeLeft > 10) {
            timerContainer.style.backgroundColor = '#4caf50'; 
        } else if (timeLeft > 5) {
            timerContainer.style.backgroundColor = '#ffeb3b'; 
        } else {
            timerContainer.style.backgroundColor = '#f44336';
        }
    }
    
    function startTimer() {
        clearInterval(timer);
        timeLeft = parseInt(timerInput.value);
        isPaused = false;
        updateTimerDisplay();
        
        timer = setInterval(function() {
            if (!isPaused) {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                }
            }
        }, 1000);
    }
    
    startBtn.addEventListener('click', startTimer);
    
    pauseBtn.addEventListener('click', function() {
        isPaused = true;
    });
    
    resumeBtn.addEventListener('click', function() {
        isPaused = false;
    });
    
    resetBtn.addEventListener('click', function() {
        clearInterval(timer);
        timeLeft = parseInt(timerInput.value);
        isPaused = false;
        updateTimerDisplay();
    });
    
  
    const targetElement = document.getElementById('targetElement');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const textColorPicker            = document.getElementById('textColorPicker');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const applyStylesBtn = document.getElementById('applyStyles');
    const resetStylesBtn = document.getElementById('resetStyles');

    applyStylesBtn.addEventListener('click', function () {
        targetElement.style.backgroundColor = bgColorPicker.value;
        targetElement.style.color = textColorPicker.value;
        targetElement.style.fontSize = fontSizeSlider.value + 'px';
        fontSizeValue.textContent = fontSizeSlider.value + 'px';
    });

    resetStylesBtn.addEventListener('click', function () {
        targetElement.style = "";
        fontSizeValue.textContent = "16px";
        fontSizeSlider.value = 16;
    });

  
    const itemInput = document.getElementById('itemInput');
    const itemList = document.getElementById('itemList');
    const addItemBtn = document.getElementById('addItem');
    const sortListBtn = document.getElementById('sortList');
    const removeDuplicatesBtn = document.getElementById('removeDuplicates');
    const reverseListBtn = document.getElementById('reverseList');

    addItemBtn.addEventListener('click', function () {
        if (itemInput.value.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = itemInput.value.trim();
            itemList.appendChild(li);
            itemInput.value = "";
        }
    });

    sortListBtn.addEventListener('click', function () {
        let items = [...itemList.children];
        items.sort((a, b) => a.textContent.localeCompare(b.textContent));
        itemList.innerHTML = "";
        items.forEach(item => itemList.appendChild(item));
    });

    removeDuplicatesBtn.addEventListener('click', function () {
        let seen = new Set();
        let items = [...itemList.children];
        items.forEach(item => {
            if (seen.has(item.textContent)) {
                item.remove();
            } else {
                seen.add(item.textContent);
            }
        });
    });

    reverseListBtn.addEventListener('click', function () {
        let items = [...itemList.children];
        itemList.innerHTML = "";
        items.reverse().forEach(item => itemList.appendChild(item));
    });

    
    const nameInput = document.getElementById('nameInput');
    const cgpaInput = document.getElementById('cgpaInput');
    const addRowBtn = document.getElementById('addRow');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    addRowBtn.addEventListener('click', function () {
        if (nameInput.value.trim() !== '' && cgpaInput.value.trim() !== '') {
            let cgpa = parseFloat(cgpaInput.value);
            let result = cgpa >= 5 ? "Pass" : "Fail";

            let row = studentTable.insertRow();
            row.innerHTML = `
                <td>${nameInput.value.trim()}</td>
                <td>${cgpa.toFixed(2)}</td>
                <td>${result}</td>
                <td>
                    <button class="editRow">Edit</button>
                    <button class="deleteRow">Delete</button>
                </td>
            `;
            nameInput.value = "";
            cgpaInput.value = "";
            addTableListeners();
        }
    });

    function addTableListeners() {
        document.querySelectorAll(".editRow").forEach(button => {
            button.addEventListener('click', function () {
                let row = this.closest('tr');
                let name = row.cells[0].textContent;
                let cgpa = row.cells[1].textContent;

                nameInput.value = name;
                cgpaInput.value = cgpa;
                row.remove();
            });
        });

        document.querySelectorAll(".deleteRow").forEach(button => {
            button.addEventListener('click', function () {
                this.closest('tr').remove();
            });
        });
    }

    addTableListeners();

  
    const thumbnails = document.querySelectorAll(".thumbnail");
    const modal = document.getElementById("imageModal");
    const expandedImage = document.getElementById("expandedImage");
    const closeModal = document.querySelector(".close");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            expandedImage.src = this.src;
            modal.style.display = "flex";
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = "none";
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});