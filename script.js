document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.ilustrasi-orang');
    const progressText = document.querySelector('.progress-bar');

    const updateStats = () => {
        const total = taskList.children.length;
        const completed = taskList.querySelectorAll('.completed').length;
        
        progressText.textContent = `${completed} / ${total}`;
        emptyImage.style.display = total === 0 ? 'block' : 'none';

        if (total > 0 && total === completed) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#eb9e5e', '#ffffff', '#ffca28']
            });
        }
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (!text) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-item-left" style="display:flex; align-items:center; gap:12px;">
                <label class="custom-checkbox">
                    <input type="checkbox" class="checkbox">
                    <span class="checkmark"></span>
                </label>
                <span class="task-text">${text}</span>
            </div>
            <div class="actions">
                <button type="button" class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked);
            updateStats();
        });

        const editBtn = li.querySelector('.edit-btn');
        const span = li.querySelector('.task-text');
        editBtn.addEventListener('click', () => {
            if (editBtn.innerHTML.includes('fa-pen')) {
                const currentText = span.textContent;
                span.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
                editBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
                span.querySelector('input').focus();
            } else {
                const newText = span.querySelector('input').value.trim();
                if (newText) {
                    span.textContent = newText;
                    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
                }
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.style.transform = "scale(0.8)";
            li.style.opacity = "0";
            setTimeout(() => {
                li.remove();
                updateStats();
            }, 300);
        });

        taskList.appendChild(li);
        taskInput.value = '';
        updateStats();
    });
});