/**
 * Created by Zeynal on 3/10/2019.
 */


/* Constants */

const drawArea = 'drArea';
const drawAreaSelector = '#'+drawArea;


const telegramFieldsGrey =  '#F2F4F5';
const telegramTextGrey =  '#96A2AA';
const telegramPreviewFieldBlue =  '#F5F9FB';
const telegramPreviewFieldBlueDarker =  '#DDEAF3';


const defaultTransform = {
    scale: 1,
    xOffset: 0,
    yOffset: 0
};


const monthEngNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 *
 * @type {{type: null, border: null, side: null, object: null}}
 */
const defaultFocusedObject = {
    type: null,
    border: null,
    side: null,
    object: null
}