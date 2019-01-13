import {
    createStyleSheet
} from '../../../../../features/base/styles';

export default createStyleSheet({
    roomContainerClass: {
        flex: 1
    },
    headerContainerClass: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#465b6c',
        elevation: 5
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 24,
    },
    subContainer: {
        flexDirection: "row",
    },
    mainTitle: {
        color: "#3b5998",
        fontSize: 30,
        marginBottom: 20,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    buttonView: {
        backgroundColor: "#3b5998",
        padding: 10,
    },
    block: {
        width: 230,
    },
    textStyle: {
        marginTop: 10,
    },
    buttontext: {
        color: "#fff",
    },
    dropDownView: {
        backgroundColor: "#8b9dc3",
        padding: 10,
    },
    dropDownText: {
        paddingTop: 2,
        color: "#fff",
    },

    menuHeader: {
        flex: 1,
        textAlign: 'center',
        fontSize: 35,
        color: '#fff',
        textAlignVertical: 'center'
    },
    menuDropDownListLayout:{
        flexDirection: 'column',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10000
    },
    menuAvatar:{
        flex: 4,
        flexDirection: 'column',
        marginBottom: 3,
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    menuDropDownList:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent:'center'  ,
        marginBottom: 2
    },
    menuEmpty:{
        flex: 3,
        marginBottom: 2
    },
    menuButton:{
        flex: 3,
        justifyContent:'center'
    },
    menuAvatarBtn:{
        flex: 3
    },
    menuBtnText:{
        zIndex: 120000,
        color: '#fff',
        width: '100%',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    menuAvatarText:{
        zIndex: 120000,
        color: '#fff',
        padding: 5,
        width: '100%',
        textAlign: 'center',
        fontSize: 20
    },
    menuLevelClassText:{
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        color: '#fff',
        textAlign:'center',
        width:'100%',
        padding:10

    },
    menuIconButton:{
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        width:30,
        marginRight: 10
    },
    menuIconAvatar:{
        flex: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 20,
        fontSize: 45,
        color: "#fff"
    },
    headerContainerMenuDisabled: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 5
    },
    headerContainerMenuEnabled: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 5,
        backgroundColor: '#f3a84e'
    },
    headerContainerUser: {
        flex: 9,
        flexDirection: 'row'
    },
    nameHeader: {
        flex: 1,
        fontSize: 10,
        color: '#fff',
        padding: 0,
        margin: 0,
        textAlignVertical: 'center',
        textAlign: 'right'
    },
    buttonLogout: {
        borderWidth: 1,
        borderRadius: 15,
        width: 23,
        height: 23,
        marginTop: 8,
        marginRight: 5,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff'
    },
    button: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLogin: {
        backgroundColor: '#001a29',
        borderRadius: 20,
        height: 40,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    buttonText: {
        alignSelf: 'center',
        color: '#f0ae3a',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600'
    },
    roomContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        elevation: 5
    },
    listContainerClass: {
        flex: 1
    },
    countTimeClass: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    scrollViewClass: {
        flex: 4,
        marginBottom: 80
    },
    viewListClass: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    viewListClassJoined: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTime: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        marginTop: 0,
        textAlign: 'center'
    },
    userName: {
        flex: 8,
        padding: 0,
        marginTop: 5,
        flexDirection: 'column',
        height: '100%'
    },
    iconUserView: {
        flex: 2,
        padding: 0,
        margin: 0,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonItemLogout: {
        textAlign: 'center',
    },
    buttonTextTime: {
        color: '#222236',
        fontWeight: '600'
    },
    buttonTextJoinClass: {
        textAlign: 'center',
        color: '#febf33',
        fontWeight: '600',
        fontSize: 14,
        margin: 0,
        padding: 0
    },
    buttonTextJoinClassFail: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
        margin: 0,
        padding: 0,
        color: '#505050',
    },
    idClass: {
        flex: 1,
        flexDirection: 'row'
    },
    imgClass: {
        flex: 2
    },
    numberStudent: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    buttonJoinClass: {
        marginBottom: 5,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151a1d',
        borderColor: '#febf33',
        width: 80,
        height: 25,
        borderWidth: 1
    },
    buttonJoinClassFail: {
        marginBottom: 5,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
        borderColor: '#d7d7d7',
        width: 80,
        height: 25,
        borderWidth: 1,
    },
    linearGradient: {
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3
    },
    buttonTextJoin: {
        color: '#151a1d',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        fontWeight: '600'
    },
    buttonTextJoinFail: {
        color: '#505050',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        fontWeight: '600'
    },
    buttonjoin: {
        backgroundColor: '#f9a138',
        zIndex: 100,
        position: 'absolute',
        bottom: 20,
        left: '30%',
        borderRadius: 20,
        borderColor: '#151a1d',
        borderWidth: 1,
        height: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonjoinFail: {
        backgroundColor: '#d7d7d7',
        zIndex: 100,
        position: 'absolute',
        bottom: 20,
        left: '30%',
        borderRadius: 20,
        borderColor: '#d7d7d7',
        borderWidth: 1,
        height: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradientClass: {
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3,
        marginTop: 5
    },
    buttonPress: {
        borderColor: '#000066',
        backgroundColor: '#000066',
        borderWidth: 1,
        borderRadius: 10
    },
    erroNetwork: {
        backgroundColor: '#fff',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewErroNetwork: {
        width: 150,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgErroNetwork: {
        width: 80,
        height: 60,
        justifyContent: 'center'
    },
    titleErroNetwork: {
        color: '#4d4d4d',
        fontWeight: '500',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    replayNetwork: {
        textAlignVertical: 'center',
        textAlign: 'center',
        marginLeft: 5,
        fontSize: 12
    },
    titleHeader: {
        flex: 6,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 14
    },
    statusUser: {
        flex: 1,
        fontSize: 10,
        color: '#36ff4e',
        padding: 0,
        marginBottom: 5,
        textAlignVertical: 'center',
        textAlign: 'right'
    },
    iconSearch: {
        flex: 1,
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 30,
        textAlign: 'right'
    },
    containerListClass: {
        borderRadius: 3,
        width: '50%',
        marginLeft: '1.5%',
        marginRight: '1.5%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 20,
        flexDirection: 'column',
        paddingBottom: 5,
        height: 180,
        backgroundColor: '#fff',
        padding: 0,
        elevation: 5
    },
    idListClass: {
        flex: 1,
        fontSize: 10,
        padding: 0,
        margin: 0,
        textAlign: 'center',
        color: '#000',
        zIndex: 5
    },
    imgIdClass: {
        height: 40,
        flex: 1,
        borderRadius: 0,
        resizeMode: 'stretch',
        position:'absolute',
        top:0,
        left:0,
        width:'100%'
    },
    itemImgClass: {
        flex: 1,
        height: 70,
        width: 62,
        borderRadius: 35,
        marginBottom: 10
    },
    nameTeacherClass: {
        flex: 1,
        fontSize: 10,
        padding: 0,
        margin: 0,
        color: '#3d3d3d',
        textAlign: 'center'
    },
    numberUserClass: {
        flex: 1,
        fontSize: 12,
        padding: 0,
        margin: 0,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000'
    },
    logoLogincreen: {
        width: 170,
        height: 40,
        marginTop: 10
    },
    logoTopicaLogin: {
        width: 200,
        height: 23,
        left: 10,
        top: 30,
        resizeMode: 'stretch',
        position: 'absolute'
    },
    fadeInView: {
        width: 250,
        height: 50,
        marginBottom: 25,
        marginTop: 170,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputUserLogin: {
        borderColor: '#050505',
        flexDirection: 'row',
        width: 250,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 25,
        elevation: 5
    },
    iconUserInput: {
        flex: 1,
        marginTop: 11,
        marginLeft: 10
    },
    inputPasswordLogin: {
        borderColor: '#050505',
        flexDirection: 'row',
        width: 250,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 25,
        elevation: 5
    },
    gifLoadLogin: {
        width: 250,
        height: 90,
        marginTop: 80
    },
    styleMenuLanguage:{
        position:'absolute',
        right:0,
        top:0,
        backgroundColor:'red'
    }
});

