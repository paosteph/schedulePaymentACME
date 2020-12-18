const { ViewFacade } = require("./view/view-facade");

const pathDataValid = './data/data-valid.txt';
const pathDataNotValid = './data/data-no-valid.txt';
const pathDataMix = './data/data-mix.txt';

const appView = new ViewFacade;
appView.showEmployeesPayByDataFile(pathDataValid);

