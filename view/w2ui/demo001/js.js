
// widget configuration
var config = {
    layout: {
        name: 'layout',
        padding: 0,
        panels: [
            { type: 'left', size: 200, resizable: true, minSize: 120 },
            { type: 'main', minSize: 550, overflow: 'hidden' }
        ]
    },
    sidebar: {
        name: 'sidebar',
        nodes: [
            {
                id: 'general', text: 'General', group: true, expanded: true, nodes: [
                  { id: 'grid1', text: 'Grid 1', img: 'icon-page', selected: true },
                  { id: 'grid2', text: 'Grid 2', img: 'icon-page' },
                  { id: 'html', text: 'Some HTML', img: 'icon-page' }
                ]
            }
        ],
        onClick: function (event) {
            switch (event.target) {
                case 'grid1':
                    w2ui.layout.content('main', w2ui.grid1);
                    break;
                case 'grid2':
                    w2ui.layout.content('main', w2ui.grid2);
                    break;
                case 'html':
                    w2ui.layout.content('main', '<div style="padding: 10px">Some HTML</div>');
                    $(w2ui.layout.el('main'))
                        .removeClass('w2ui-grid')
                        .css({
                            'border-left': '1px solid silver'
                        });
                    break;
            }
        }
    },
    grid1: {
        name: 'grid1',
        columns: [
            { field: 'fname', caption: 'First Name', size: '180px' },
            { field: 'lname', caption: 'Last Name', size: '180px' },
            { field: 'email', caption: 'Email', size: '40%' },
            { field: 'sdate', caption: 'Start Date', size: '120px' }
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ]
    },
    grid2: {
        name: 'grid2',
        columns: [
            { field: 'state', caption: 'State', size: '80px' },
            { field: 'title', caption: 'Title', size: '100%' },
            { field: 'priority', caption: 'Priority', size: '80px', attr: 'align="center"' }
        ],
        records: [
            { recid: 1, state: 'Open', title: 'Short title for the record', priority: 2 },
            { recid: 2, state: 'Open', title: 'Short title for the record', priority: 3 },
            { recid: 3, state: 'Closed', title: 'Short title for the record', priority: 1 }
        ]
    }
};

$(function () {
    // initialization
    $('#main').w2layout(config.layout);
    w2ui.layout.content('left', $().w2sidebar(config.sidebar));
    w2ui.layout.content('main', $().w2grid(config.grid1));
    // in memory initialization
    $().w2grid(config.grid2);
});