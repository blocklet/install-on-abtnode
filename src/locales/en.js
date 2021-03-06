const flat = require('flat');

module.exports = flat({
  common: {
    noData: 'no ABT Node Data',
    actions: 'actions',
    delete: 'Delete',
    cancel: 'Cancel',
    next: 'Next',
    prev: 'Prev',
    confirm: 'Confirm',
    requiredError: 'Please provide a valid {type}',
    copy: 'Copy To Clipboard',
    yes: 'YES',
    no: 'NO',
    delConfirm: 'I understand the consequences, delete',
    notice: 'Unexpected bad things will happen if you don’t read this!',
    click: 'Click to copy',
    delInfo: {
      title: 'Delete ABT Node',
      description: 'This will permanently delete ABT Node with name {name}',
      confirm_desc: 'Please input {did} to confirm',
    },
  },
  abtnode: {
    tableTitle: 'ABT Node List',
    add: 'Add ABT Node',
    info: 'Register ABT Node',
    placeholder: 'Please Enter ABT Node URL',
    table: {
      name: 'Title',
      description: 'Description',
      url: 'URL',
      createdAt: 'Create Time',
      initialized: 'Initialized',
      did: 'DID',
    },
    fail: 'The request failed. Please try again',
    exist: 'This node with name({name}) is already registered',
    addTime: 'Added at {time}',
  },
  generate: {
    add: 'Generate Install Button',
    link: 'Generate Install Link',
    placeholder: 'Please Enter Blocklet Meta URL',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta Info',
      title: 'Title',
      description: 'Description',
      version: 'Version',
    },
    basicInfo: 'Basic Info',
    action: 'Action',
    selectnode: 'Install Blocklet To My ABT Node',
    select: 'Select',
    fail: 'The request failed. Please try again',
  },
  tips: {
    title: "Don't see your ABT Node here? Follow the steps below to add it:",
    steps: {
      one: 'Login to your ABT Node',
      two: 'Go to the "Settings" page',
      three: 'Click on "Register this ABT Node"',
      four: 'Your ABT Node will now appear below.',
    },
    setup: "Haven't setup ABT Node? ",
    visit: 'Visit for more information on how to set up your ABT Node.',
  },
});
