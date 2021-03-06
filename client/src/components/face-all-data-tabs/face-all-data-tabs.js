import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FrameWithTitle from "../frame-with-title";
import FaceNames from "../face-names";
import FaceResidences from "../face-residences";
import FaceContacts from "../face-contacts";
import FaceDocuments from "../face-documents";
import FaceCitizenships from "../face-citizenships";
import FaceEducations from "../face-educations";
import FaceWorks from "../face-works";
import FaceEntranceExamin from "../face-entrance-examin";
import FaceScientificPubl from "../face-scientific-publ";
import FaceBusinessTrip from "../face-business-trip";
import FaceExaminations from "../face-examinations";
import FaceCertificationResult from "../face-certification-result";
import Typography from "@material-ui/core/Typography";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import FaceOrders from "../face-orders";
import FaceAspirant from "../face-aspirant";
import FacePhoto from "../face-photo";
import Grid from "@material-ui/core/Grid";
import FaceAspirantAcadem from "../face-aspirant-academ";

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        // width: 500,
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const tabs = [
    {
        id: 0,
        label: '???????????? ?? ????????',
        content: (faceId) =>
            <Grid container>
                <Grid item>
                    <FrameWithTitle head='????????'>
                        <FacePhoto faceId={faceId}/>
                    </FrameWithTitle>
                </Grid>
                <Grid style={{flexGrow: '1'}} item>
                    <FrameWithTitle head='???????????????????? ??????'>
                        <FaceNames faceId={faceId}/>
                    </FrameWithTitle>
                </Grid>
                <Grid style={{flexGrow: '1'}} item>
                    <FrameWithTitle head='????????????????????'>
                        <FaceResidences faceId={faceId}/>
                    </FrameWithTitle>
                </Grid>
                <Grid style={{flexGrow: '1'}} item>
                    <FrameWithTitle head='????????????????'>
                        <FaceContacts faceId={faceId}/>
                    </FrameWithTitle>
                </Grid>
            </Grid>
    },
    {
        id: 1,
        label: '????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='????????????????'>
                <FaceAspirant faceId={faceId}/>
            </FrameWithTitle>
            <FrameWithTitle head='?????????????????????????? ????????????'>
                <FaceAspirantAcadem faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 2,
        label: '??????????????????, ??????????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='??????????????????'>
                <FaceDocuments faceId={faceId}/>
            </FrameWithTitle>
            <FrameWithTitle head='??????????????????????'>
                <FaceCitizenships faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 3,
        label: '??????????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='??????????????????????'>
                <FaceEducations faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 4,
        label: '???????????????? ????????????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='??????????????????????'>
                <FaceWorks faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 5,
        label: '???????????????????????? ??????????????',
        content: (faceId) => <>
            <FrameWithTitle head='???????????????????????? ??????????????'>
                <FaceEntranceExamin faceId={faceId} isCandidateMin={true}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 6,
        label: '?????????????????????????? ????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='?????????????????????????? ????????????????'>
                <FaceEntranceExamin faceId={faceId} isCandidateMin={false}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 7,
        label: '?????????????? ????????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='?????????????? ????????????????????'>
                <FaceScientificPubl faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 8,
        label: '??????????????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='??????????????????????????'>
                <FaceBusinessTrip faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 9,
        label: '????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='????????????????'>
                <FaceExaminations faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 10,
        label: '????????????????????',
        content: (faceId) => <>
            <FrameWithTitle head='????????????????????'>
                <FaceCertificationResult faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
    {
        id: 11,
        label: '??????????????',
        content: (faceId) => <>
            <FrameWithTitle head='???????????????????? ?? ????????????????'>
                <FaceOrders faceId={faceId}/>
            </FrameWithTitle>
        </>
    },
]

const FaceAllDataTabs = ({faceId}) => {
    const {faces: {dataset, fetchOne}} = useAspirantApiContext();
    const [value, setValue] = React.useState(0);

    const face = dataset.find(i => +i.id === +faceId);

    useEffect(() => {
        if (!face)
            fetchOne(faceId);
    }, [face, faceId])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();
    return (
        <>
            <Typography align='center' variant='h5' color='textPrimary' gutterBottom>
                {face && `${face.lastname} ${face.firstname} ${face.middleName}, ${new Date(face.birthdate).toLocaleDateString()} ??.??.`}
            </Typography>

            <div className={classes.root}>
                <Paper elevation={3}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            defaultValue={tabs[0].id}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {tabs.map(i => <Tab key={i.id} value={i.id} label={i.label}/>)}
                        </Tabs>
                    </AppBar>
                    {tabs.map(i => <TabPanel key={i.id} index={i.id} value={value}>
                        {i.content(faceId)}
                    </TabPanel>)}
                </Paper>
            </div>
        </>
    )
}

export default FaceAllDataTabs;