/**
 * Created by Zeynal on 3/10/2019.
 */


/* Constants */

const drawArea = 'drArea';
const drawAreaSelector = '#'+drawArea;


const telegramFieldsGrey =  '#F2F4F5';
const telegramTextGrey =  '#96A2AA';
const telegramPreviewFieldBlue =  'rgba(245,	249,	251, 0.5)';
const telegramPreviewFieldBlueDarker =  '#DDEAF3';
const telegramInfoBarBorder =  '#rgab(	237, 237, 237, 0.1)';
const telegramInfoBarColor =  '#FFFFFF';


const joinedCheckBox = '#joined';
const leftCheckBox = '#left';


const monthEngNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const weekEngNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


const defaultTransform = {
    xOffset: 0,
    xRatio: 0,
    yRatio: 0,
    prevYRatio: 0,
    timeStapmRation: 0,
};

const graphContainer = {
    'name': null,
    'color': null,
    'object': [],
    'draw': false,
    'info': {}
};


const defaultFocus = {
    type: null,
    border: null,
    side: null,
    object: null,
    info: null
};

const defaultTextInfo = {
    text: '',
    pos: null,
    color: null
}

const defaultMesh = {
    type: null,
    object: null
};

const defaultMeshMaterial = {
    color: null,
    width: null
}
