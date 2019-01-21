import React                    from 'react';
import { connect }              from 'react-redux';
import { 
    View, Text, Image, WebView,Linking,Share,Keyboard,Platform,
    TouchableHighlight, StyleSheet, StatusBar,BackHandler
}                               from 'react-native';
import LinearGradient           from 'react-native-linear-gradient';
import { SearchBar }            from 'react-native-elements';
import FontAwesome              from 'react-native-vector-icons/FontAwesome';
import {
    redirect,
    setCategory1,
    setCurrentCate,
    setPageTitle,
    setCategory2,
    setContent
}                               from './../actions/book';
import {
    getListCategory,getListCategorySmall, getContentView, search
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
            searchStatus: false,
            searchContent: '',
            title:''
        };
        this._onHardwareBackPress = this._onHardwareBackPress.bind(this);
        this._onBackMenu          = this._onBackMenu.bind(this);
        this._onSharing           = this._onSharing.bind(this);
        this._onSearchChange      = this._onSearchChange.bind(this);
        this._onSearchCancel      = this._onSearchCancel.bind(this);
        this._onSearch            = this._onSearch.bind(this);
        this._onSearchGo          = this._onSearchGo.bind(this);
        this.onBackHome           = this.onBackHome.bind(this);
    }

    componentWillMount(){
        getListCategory().then(list => {
            this.props.dispatch(setCategory1(list));
        })
        this.setState({pageTitle:'TRẬT ĐẢ DỊCH CỐT TRỤ'});
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
        if (this.props._route != 1){
            if (!this.state.searchStatus){
                if (this.props._route == 2){
                    this.props.dispatch(setPageTitle('TRẬT ĐẢ DỊCH CỐT TRỤ'));
                } else {
                    this.props.dispatch(setPageTitle(this.state.pageTitle));
                }
                this.props.dispatch(redirect(this.props._route - 1)); 
                return this._backHandler;
            } else {
                this.setState({searchStatus:false});
            }
        } else {
            BackHandler.exitApp();
        }
        this.setState({searchStatus:false});
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
        this.props.dispatch(setPageTitle(route.name_cat));
        this.setState({pageTitle:route.name_cat});
        this.props.dispatch(setCurrentCate(route.id_cat, route.name_cat));
    }

    _setView(cate){
        let title = cate.name_cat?cate.name_cat:cate.title;
        this.props.dispatch(setPageTitle(title));
        let id = cate.id_cat? cate.id_cat : cate.id_ca;
        getContentView(id).then(data => {
            this.setState({searchStatus:false});
            this.props.dispatch(setContent(data.content));
        }) 
    }

    _onBackMenu(){
        this.props.dispatch(redirect(this.props._route - 1));
        this.props.dispatch(setPageTitle(this.state.pageTitle));
    }
    _onSharing(){
        Share.share({
            message: 'Trật đả dịch cốt trụ - Làm chủ cột sống làm chủ sinh mệnh!',
            url: 'https://play.google.com/store/apps/details?id=com.hainn.bvcs',
            title: 'Ứng dụng tác động cột sống - Trật đả dịch cốt trụ'
          }, {
            // Android only:
            dialogTitle: 'Chia sẻ ứng dụng Bệnh viện cột sống',
            // iOS only:
            excludedActivityTypes: [
              'com.apple.UIKit.activity.PostToTwitter'
            ]
          })
    }

    _onSearchChange(value: string){
        this.setState({ searchContent: value });
    }

    _onSearchGo(){
        search(this.state.searchContent).then(list => {
            let title = "Danh mục chứa: \"" + this.state.searchContent+"\"";
            this.props.dispatch(setPageTitle(title));
            this.setState({pageTitle:title});
            this.props.dispatch(setCategory2(list));
        })
    }

    _onSearchCancel(){
        this.setState({searchStatus:false, searchContent:''});
    }

    _onSearch(){
        this.setState({searchStatus:true});
    }

    onBackHome(){
        getListCategory().then(list => {
            this.props.dispatch(setCategory1(list));
            this._closeControlMenu();
        })
    }

    _renderSearchIcon(){
        return(
            <View>
                <TouchableHighlight onPress={this._onSearchGo} style={styles.headerContainerMenuDisabled}>
                    <FontAwesome name='search' style={styles.iconSearch} />
                </TouchableHighlight>
            </View>
        );
    }

    _onRating(){
        let link = "https://play.google.com/store/apps/details?id=com.hainn.bvcs";
        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                alert("No apps found on store!");
            } else {
                return Linking.openURL(link);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    
    _renderContentMenu() {
        return (
            <LinearGradient
                colors={['#015d01','#379901']}
                end={{x: 0.25, y: 0.25}} start={{x: 1.0, y: 1.0}}
                style={styles.menuDropDownListLayout}>
                <StatusBar hidden={true} />
                
                <View style={styles.menuAvatar}>
                    <TouchableHighlight onPress={() => this.onBackHome()}>
                        <Image style={styles.menuIconAvatar} source={require('./../images/icontab.jpg')} />
                    </TouchableHighlight>
                    <Text style={styles.menuAvatarText}>TRẬT ĐẢ DỊCH CỐT TRỤ</Text>
                    <Text style={styles.menuAvatarTextSmall}>Làm chủ cột sống làm chủ sinh mệnh</Text>
                </View>
                <View style={{height:'65%',backgroundColor: '#fffad8',}}>
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
                                        <View style={styles.categoryTab}><View style={{width:25}}><Text><FontAwesome name='caret-up' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnTextTab}>{category.name_cat.toUpperCase()}</Text></View>
                                    </TouchableHighlight>
                                </View>
                            )
                        })
                    }
                    
                    <View style={styles.menuDropDownList}>
                        <TouchableHighlight
                            accessibilityLabel={'Tap to share app.'}
                            style={styles.menuButton}
                            onPress={()=>
                                this._onSharing()
                            }
                            underlayColor='white'>
                            <View style={styles.categoryTab}><View style={{width:25}}><Text><FontAwesome name='share-alt' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnTextTab}>CHIA SẺ</Text></View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.menuDropDownList}>
                        <TouchableHighlight
                            accessibilityLabel={'Tap to rate app.'}
                            style={styles.menuButton}
                            onPress={()=>
                                this._onRating()
                            }
                            underlayColor='white'>
                            <View style={styles.categoryTab}><View style={{width:25}}><Text><FontAwesome name='caret-up' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnTextTab}>ĐÁNH GIÁ</Text></View>
                        </TouchableHighlight>
                    </View>
                </View>
            </LinearGradient>
        )
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
                        { this.props._route != 3 &&
                            <TouchableHighlight onPress={this._openControlMenu} style={styles.headerContainerMenuDisabled}>
                                <FontAwesome name='reorder' style={styles.menuHeader} />
                            </TouchableHighlight>
                        }
                        { this.props._route == 3 &&
                            <TouchableHighlight onPress={this._onBackMenu} style={styles.headerContainerMenuDisabled}>
                                <FontAwesome name='arrow-left' style={styles.backHeader} />
                            </TouchableHighlight>
                        }
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 10,
                            }}>
                                <Text style={styles.titleHeader}>{this.state.searchStatus ? this.props.pageTitle :this.props.pageTitle.toUpperCase()}</Text>
                                { this.props._route == 1 &&
                                    <Text style={styles.menuAvatarTextSmallTitle}>Làm chủ cột sống làm chủ sinh mệnh</Text>
                                }
                            </View>
                        {
                            this.props._route == 3 && this.state.searchStatus &&
                            <SearchBar
                                ref={ref => this.search = ref}
                                onChangeText={this._onSearchChange}
                                searchIcon = {this._renderSearchIcon}
                                onSubmitEditing ={this._onSearchGo}
                                onCancel = {this._onSearchCancel}
                                platform={Platform.OS === "ios" ? "ios" : "android"}
                                lightTheme
                                clearIcon
                                placeholder      ='...Tìm kiếm...'
                                returnKeyType    ='search'
                                cancelButtonTitle="Cancel"
                                containerStyle = {{width:'100%',backgroundColor:'#5ec000'}}
                            />
                        }
                        <View style={styles.iconUserView}>
                            { this.props._route == 3 &&
                                <TouchableHighlight onPress={this._onSearch} style={styles.headerContainerMenuDisabled}>
                                    <FontAwesome name='search' style={styles.iconSearch} />
                                </TouchableHighlight>
                            }
                        </View>
                    </View>
                    {
                        this.props._route == 1 &&
                        <View style={{width:"100%",height:"82%", backgroundColor:"#fffad8"}}>
                            <View style={styles.mainCategoryView}>
                                <Image style={styles.menuIconMainView} source={require('./../images/iconmain.jpg')} />
                                { 
                                    this.props.listCategory1.map((category, index) => {
                                        return(
                                            <View style={styles.menuDropDownListMainView} key={index}>
                                                <TouchableHighlight
                                                    accessibilityLabel={'Tap to open list class LS'}
                                                    style={styles.menuButton}
                                                    onPress={()=>{this._redirect(category);}}
                                                    underlayColor='white'>
                                                    <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat.toUpperCase()}</Text></View>
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
                        <View style={{width:"100%",height:"82%", backgroundColor:"#fffad8"}}>
                            <View style={styles.mainCategoryView}>
                                <Image style={styles.menuIconMainView} source={require('./../images/iconmain.jpg')} />
                                { 
                                    this.props.listCategory2.map((category, index) => {
                                        return(
                                            <View style={styles.menuDropDownListMainView} key={index}>
                                                <TouchableHighlight
                                                    accessibilityLabel={'Tap to open list class LS'}
                                                    style={styles.menuButton}
                                                    onPress={()=>{this._setView(category);}}
                                                    underlayColor='white'>
                                                    <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat ? category.name_cat.toUpperCase() : category.title.toUpperCase()}</Text></View>
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
                        <View style={{height: '82%', backgroundColor:'#fffad8'}}>
                            <WebView
                                originWhitelist={['*']}
                                source={{ baseUrl: '', html: this.props.contentView }}
                                onLoadEnd={() => {
                                    this.setState({loading: false});
                                }}
                                style={{height: '82%', backgroundColor:'#fffad8', marginLeft:10, marginRight:10}}
                            />
                        </View>
                    }
                    <View style={styles.footerContainerClass}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Image style={styles.menuIconAvatarFooter} source={require('./../images/iconfooter.jpg')} />
                            <Text style={this.props._route == 1 ? styles.titleFooter1 :styles.titleFooter}>NHUẬN LỰC: 0986 880 998</Text>
                        </View>
                    </View>
                    {/* {
                        this.state.shareStatus &&
                        <View style={{height: '82%', backgroundColor:'red'}}>
                            <TestShare />
                        </View>
                    } */}
                </View>
            </Drawer>
        );
    }

}

const styles = StyleSheet.create({
    category:{
        flexDirection: 'row',
        borderRadius:2
    },
    categoryTab:{
        flexDirection: 'row',
        borderRadius:2,
        paddingLeft:10
    },
    roomContainerClass: {
        flex: 1
    },
    headerContainerClass: {
        height: '10%',
        flexDirection: 'row',
        elevation: 5
    },
    footerContainerClass: {
        height: '8%',
        flexDirection: 'row',
        elevation: 5
    },
    menuHeader: {
        flex: 1,
        textAlign: 'center',
        fontSize: 35,
        color: '#fff',
        textAlignVertical: 'center'
    },
    backHeader:{
        flex: 1,
        textAlign: 'center',
        fontSize: 30,
        color: '#015d01',
        textAlign: 'center',
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
    },
    menuDropDownListLayout:{
        flexDirection: 'column',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(94, 192, 0, 0.5)',
    },
    menuAvatar:{
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 3,
        backgroundColor: 'rgba(94, 192, 0, 0.5)',
    },
    mainCategoryView:{
        flex: 3,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    menuDropDownList:{
        flexDirection: 'row',
        backgroundColor: '#fffad8',
        justifyContent:'center',
    },
    menuDropDownListMain : {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent:'center'  ,
        marginBottom: 2,
        height: 50
    },
    menuDropDownListMainView : {
        flexDirection: 'row',
        backgroundColor: '#2d8900',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 2,
        height: 50,
        borderRadius: 10,
        marginTop: 2,
        borderBottomColor: '#ff2d16',
        borderBottomWidth: 1
    },
    menuButton:{
        flex: 3,
        justifyContent:'center',
        height: 50
    },
    menuBtnText:{
        zIndex: 120000,
        color: '#fff',
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    menuBtnTextTab:{
        zIndex: 120000,
        color: '#015d01',
        width: '100%',
        textAlignVertical: 'center'
    },
    menuAvatarText:{
        zIndex: 120000,
        color: '#ff2d16',
        textAlign: 'center',
        fontSize: 25,
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
    },
    menuAvatarTextSmall:{
        zIndex: 120000,
        color: '#ff2d16',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 5,
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
    },
    menuAvatarTextSmallTitle:{
        color: '#015d01',
        textAlign: 'center',
        fontSize: 12,
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2
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
        marginTop: 20,
        width: 120,
        height: 100
    },
    menuIconAvatarFooter:{
        width: '18%',
        height: '100%',
        marginRight: 10
    },
    menuIconMain:{
        marginTop: 20,
        width: '30%'
    },
    menuIconMainView:{
        width:'35%',
        height:'20%',
        marginTop:10,
        marginBottom: 10
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
        color: '#015d01',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
    },
    titleFooter: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 20,
    },
    titleFooter1: {
        color: '#ff2d16',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
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