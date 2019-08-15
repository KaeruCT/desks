const makeLabel = (label, id) => {
    const container = document.createElement('div');
    const labelEl = document.createElement('span');
    labelEl.className = 'label tr b dib';
    labelEl.innerText = `${label}: `;
    const value = document.createElement('span');
    value.id = id;
    container.appendChild(labelEl);
    container.appendChild(value);
    return container;
};

const makeButton = (btnText, action) => {
    const btn = document.createElement('button');
    btn.className = 'f6 link dim br2 ph3 pv2 dib white bg-dark-blue';
    btn.innerText = btnText;
    btn.addEventListener('click', action);
    return btn;
};

const makeDropdown = opts => {
    const dropdown = document.createElement('select');
    dropdown.className = 'pa1 ba br2';
    opts.forEach(o => {
        const opt = document.createElement('option');
        opt.innerText = o.text;
        opt.value = o.value;
        dropdown.appendChild(opt);
    });
    return dropdown;
};