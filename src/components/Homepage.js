import React                    from 'react';
import { connect }              from 'react-redux';
import { 
    View, Text, Image, WebView,
    TouchableHighlight, StyleSheet, StatusBar,BackHandler
}                               from 'react-native';
import LinearGradient           from 'react-native-linear-gradient';
import FontAwesome              from 'react-native-vector-icons/FontAwesome';
import { Icons }                from 'react-native-fontawesome';
import {
    redirect,
    setCategory1,
    setCurrentCate,
    setPageTitle,
    setCategory2,
    setContent
}                               from './../actions/book';
import {
    getListCategory,getListCategorySmall, getContentView
}                               from './../apis/book';
import Drawer                   from 'react-native-drawer';
import Orientation              from 'react-native-orientation';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading     : true,
            disable     : false,
            dropmenu    : false,
        };
        this._onHardwareBackPress = this._onHardwareBackPress.bind(this);
      
    }

    componentWillMount(){
        getListCategory().then(list => {
            this.props.dispatch(setCategory1(list));
        })
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        const backHandler = BackHandler || BackAndroid;

        if (backHandler) {
            this._backHandler = backHandler;
            backHandler.addEventListener(
                'hardwareBackPress',
                this._onHardwareBackPress);
        }    
    }

    _onHardwareBackPress() {
        return this._backHandler && this.props._route !="HOME" &&  this.props.dispatch(redirect("HOME"));;
    }

    _closeControlMenu = () => {
        var e = this;
        return new Promise(
            function (resolve){
                e._drawer.close();
                setTimeout(() => {resolve("Closed");},200);
            }
        );
    };

    _openControlMenu = () => {
        this._drawer.open();
    };

    _redirect(route){
        getListCategorySmall(route.id_cat).then(list => {
            this.props.dispatch(setCategory2(list));
        })   
        this.props.dispatch(redirect(route.id_cat));
        this.props.dispatch(setPageTitle(route.name_cat));
        this.props.dispatch(setCurrentCate(route.id_cat, route.name_cat));
    }

    _setView(cate){
        getContentView(cate.id_cat).then(data => {
            this.props.dispatch(setContent(data.content));
        }) 
    }
    _onSharing(){

    }

    _onRating(){

    }
    
    _renderContentMenu() {
        return (
            <LinearGradient
                colors={['#9e7b02', '#006763']}
                end={{x: 0.25, y: 0.25}} start={{x: 1.0, y: 1.0}}
                style={styles.menuDropDownListLayout}>
                <StatusBar hidden={true} />
                
                <View style={styles.menuAvatar}>
                    <Image style={styles.menuIconAvatar} source={require('./../images/icon.jpg')} />
                    <Text style={styles.menuAvatarText}>TRẬT ĐẢ DỊCH CỐT TRỤ</Text>
                    <Text style={styles.menuAvatarTextSmall}>Làm chủ cột sống làm chủ sinh mệnh</Text>
                </View>
                { 
                    this.props.listCategory1.map((category, index) => {
                        return(
                            <View style={styles.menuDropDownList} key={index}>
                                <TouchableHighlight
                                    accessibilityLabel={'Tap to open category'}
                                    style={styles.menuButton}
                                    onPress={()=>{this._closeControlMenu().then(()=>{
                                        this._redirect(category);
                                    })}}
                                    underlayColor='white'>
                                    <View style={styles.category}><View style={{width:25}}><Text><FontAwesome name='caret-up' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnText}>{category.name_cat}</Text></View>
                                </TouchableHighlight>
                            </View>
                        )
                    })
                }
                
                <View style={styles.menuDropDownList}>
                    <TouchableHighlight
                        accessibilityLabel={'Tap to share app.'}
                        style={styles.menuButton}
                        onPress={()=>{this._closeControlMenu().then(()=>{
                            this._onSharing();
                        })}}
                        underlayColor='white'>
                        <View style={styles.category}><View style={{width:25}}><Text><FontAwesome name='share-alt' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnText}>Chia sẻ</Text></View>
                    </TouchableHighlight>
                </View>
                <View style={styles.menuDropDownList}>
                    <TouchableHighlight
                        accessibilityLabel={'Tap to rate app.'}
                        style={styles.menuButton}
                        onPress={()=>{this._closeControlMenu().then(()=>{
                            this._onRating();
                        })}}
                        underlayColor='white'>
                        <View style={styles.category}><View style={{width:25}}><Text><FontAwesome name='caret-up' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnText}>Đánh giá</Text></View>
                    </TouchableHighlight>
                </View>
            </LinearGradient>
        )
    }

    renderMainCategory(){
        return(
            <View style={styles.mainCategory}>
                <Image style={styles.menuIconMain} source={require('./../images/icon.jpg')} />
                { 
                    this.props.listCategory1.map((category, index) => {
                        return(
                            <View style={styles.menuDropDownListMain} key={index}>
                                <TouchableHighlight
                                    accessibilityLabel={'Tap to open list class LS'}
                                    style={styles.menuButton}
                                    onPress={()=>{this._redirect(category);}}
                                    underlayColor='white'>
                                    <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat}</Text></View>
                                </TouchableHighlight>
                            </View>
                        )
                    })
                }
            </View>
        );
    }


    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={this._renderContentMenu()}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                onClose={()=>{this.setState({dropmenu:false})}}
                onOpen={()=>{this.setState({dropmenu:true})}}
            >
                <View style={styles.roomContainerClass}>
                    <Image style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }} source={require('./../images/bgr_main.jpg')} />
                    <View style={styles.headerContainerClass}>
                        <TouchableHighlight onPress={this._openControlMenu} style={styles.headerContainerMenuDisabled}>
                            <FontAwesome name='reorder' style={styles.menuHeader} />
                        </TouchableHighlight>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 10,
                            flexDirection: 'row',
                        }}>
                            <Text style={styles.titleHeader}>{this.props.pageTitle}</Text>
                        </View>
                        <View style={styles.iconUserView}>
                            <FontAwesome name='search' style={styles.iconSearch} />
                        </View>
                    </View>
                    {
                        this.props._route == 1 &&
                        <View style={{width:"100%",height:"100%"}}>
                            <View style={styles.mainCategory}>
                                <Image style={styles.menuIconMain} source={require('./../images/icon.jpg')} />
                                { 
                                    this.props.listCategory1.map((category, index) => {
                                        return(
                                            <View style={styles.menuDropDownListMain} key={index}>
                                                <TouchableHighlight
                                                    accessibilityLabel={'Tap to open list class LS'}
                                                    style={styles.menuButton}
                                                    onPress={()=>{this._redirect(category);}}
                                                    underlayColor='white'>
                                                    <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat}</Text></View>
                                                </TouchableHighlight>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    }
                    {
                        this.props._route == 2 &&
                        <View style={{width:"100%",height:"100%"}}>
                            <View style={styles.mainCategory}>
                                <Image style={styles.menuIconMain} source={require('./../images/icon.jpg')} />
                                { 
                                    this.props.listCategory2.map((category, index) => {
                                        return(
                                            <View style={styles.menuDropDownListMain} key={index}>
                                                <TouchableHighlight
                                                    accessibilityLabel={'Tap to open list class LS'}
                                                    style={styles.menuButton}
                                                    onPress={()=>{this._setView(category);}}
                                                    underlayColor='white'>
                                                    <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat}</Text></View>
                                                </TouchableHighlight>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    }
                    {
                        this.props._route == 3 &&
                        <WebView
                            originWhitelist={['*']}
                            source={{ baseUrl: '', html: this.props.contentView }}
                            onLoadEnd={() => {
                                this.setState({loading: false});
                            }}
                        />
                    }
                </View>
            </Drawer>
        );
    }

}

const styles = StyleSheet.create({
    category:{
        flexDirection: 'row',
        paddingLeft:10,
        borderRadius:2
    },
    roomContainerClass: {
        flex: 1
    },
    headerContainerClass: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#465b6c',
        elevation: 5
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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    mainCategory:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    menuDropDownList:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent:'center'  ,
        marginBottom: 2
    },
    menuDropDownListMain : {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent:'center'  ,
        marginBottom: 2,
        height: 50
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
        flex:3,
        zIndex: 120000,
        color: '#ff1a1a',
        textAlign: 'center',
        fontSize: 25,
    },
    menuAvatarTextSmall:{
        zIndex: 120000,
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 5
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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '40%',
        height: '40%'
    },
    menuIconMain:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '20%',
        height: '20%'
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
    buttonText: {
        alignSelf: 'center',
        color: '#f0ae3a',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600'
    },
    scrollViewClass: {
        flex: 4,
        marginBottom: 80
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
    linearGradient: {
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3
    },
    linearGradientClass: {
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3,
        marginTop: 5
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
    styleMenuLanguage:{
        position:'absolute',
        right:0,
        top:0,
        backgroundColor:'red'
    }
});

function _mapStateToPropsTop(state) {
	return {
        _route        : state.app.route,
        pageTitle     : state.app.pageTitle,
        listCategory1 : state.app.listCategory1,
        listCategory2 : state.app.listCategory2,
        contentView   : state.app.contentView,
	};
}
export default connect(_mapStateToPropsTop)(Homepage);