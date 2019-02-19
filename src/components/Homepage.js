import React                    from 'react';
import { connect }              from 'react-redux';
import { 
    View, Text, Image, WebView,Linking,Share,Keyboard,Platform,Dimensions,Alert,TouchableOpacity,
    TouchableHighlight, StyleSheet, StatusBar,BackHandler,ScrollView, ImageBackground, NetInfo
}                               from 'react-native';
import LinearGradient           from 'react-native-linear-gradient';
import FontAwesome              from 'react-native-vector-icons/FontAwesome';
import AntIcon                  from "react-native-vector-icons/AntDesign";
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
import SearchInput, { createFilter } from 'react-native-search-filter';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading     : true,
            disable     : false,
            dropmenu    : false,
            searchStatus: false,
            searchContent: '',
            searchResults: [],
            title:'',
            subView:false,
            subViewContent: {},
            key:1
        };
        this._onHardwareBackPress = this._onHardwareBackPress.bind(this);
        this._onBackMenu          = this._onBackMenu.bind(this);
        this._onSharing           = this._onSharing.bind(this);
        this._onSearchChange      = this._onSearchChange.bind(this);
        this._onSearchCancel      = this._onSearchCancel.bind(this);
        this._onSearch            = this._onSearch.bind(this);
        this._setViewSearch       = this._setViewSearch.bind(this);
        this.onBackHome           = this.onBackHome.bind(this); 
        this._setSubView          = this._setSubView.bind(this);
    }

    componentWillMount(){
        this.handleConnectivityChange.bind(this);        
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );
        getListCategory().then(list => {
            this.props.dispatch(setCategory1(list));
        })
        this.setState({pageTitle:'TRẬT ĐẢ DỊCH CỐT TRỤ'});
    }

    handleConnectivityChange(connectionInfo) {
        if(connectionInfo.type == "none" || connectionInfo.type == "unknown"){
            Alert.alert('Thông báo','Đã mất kết nối mạng. Vui lòng kết nối lại để có đầy đủ nội dung ứng dụng!');
        }   
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );
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
        if (this.props.pageTitle == "Liên Hệ Đào Tạo"){
            this.onBackHome();
        } else {
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
        }
        this.setState({ subView:false });
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
        this.setState({subView:false});
        getListCategorySmall(route.id_cat).then(list => {
            this.props.dispatch(setCategory2(list));
        })   
        this.props.dispatch(setPageTitle(route.name_cat));
        this.setState({pageTitle:route.name_cat});
        this.props.dispatch(setCurrentCate(route.id_cat, route.name_cat));
        this.setState({searchStatus:false});
    }

    _setView(cate){
        let title = cate.name_cat?cate.name_cat:cate.title;
        this.props.dispatch(setPageTitle(title));
        let id = cate.id_cat? cate.id_cat : cate.id_ca;
        getContentView(id).then(data => {
            if (data.content != null &&data.content != ''){
                this.setState({searchStatus:false});
                this.props.dispatch(setContent(data.content));
            } else {
                Alert.alert('Thông báo',"Nội dung đang trong quá trình cập nhật..");
            }
        }) 
    }

    _setViewSearch(cate){
        this.props.dispatch(setPageTitle(cate.post_title));
        let id = cate.id_cat? cate.id_cat : cate.id_ca;
        getContentView(id).then(data => {
            if (data.content != null &&data.content != ''){
                this.setState({searchStatus:false});
                this.props.dispatch(setContent(data.content));
            } else {
                Alert.alert('Thông báo',"Nội dung đang trong quá trình cập nhật..");
            }
        })
    }

    _setSubView(cate){
        this.setState({subView:true, subViewContent:cate});
        this.props.dispatch(redirect(3));
    }

    _onBackMenu(){
        if (this.props.pageTitle == "Liên Hệ Đào Tạo"){
            this.onBackHome();
        } else {
            this.setState({subView:false});
            this.props.dispatch(redirect(this.props._route - 1));
            this.props.dispatch(setPageTitle(this.state.pageTitle));
        }
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
        search(value).then(list => {
            this.setState({searchResults:list})
        })
    }

    _onSearchCancel(){
        this.setState({searchStatus:false, searchContent:''});
    }

    _onSearch(){
        if(!this.state.searchStatus){
            this.setState({searchStatus:true});
        } else {
            this.setState({searchStatus:false});
        }
    }

    onBackHome(){
        this.setState({subView:false});
        getListCategory().then(list => {
            this.props.dispatch(setCategory1(list));
            this.props.dispatch(setPageTitle('TRẬT ĐẢ DỊCH CỐT TRỤ'));
            this._closeControlMenu();
        })
    }

    _onRating(){
        let link = Platform.OS == 'android' ? "https://play.google.com/store/apps/details?id=com.hainn.bvxk" : "itms://itunes.apple.com/us/app/apple-store/id375380948?mt=8";
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
            <View
                style={styles.menuDropDownListLayout}>
                <StatusBar hidden={true} />
                <Image style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }} source={require('./../images/bggreen.jpg')} />
                
                <View style={styles.menuAvatar}>
                <Image style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }} source={require('./../images/background.jpg')} />
                    <TouchableHighlight onPress={() => this.onBackHome()}>
                        <Image style={styles.menuIconAvatar} source={require('./../images/icontab.jpg')} />
                    </TouchableHighlight>
                    <Text style={styles.menuAvatarText}>TRẬT ĐẢ DỊCH CỐT TRỤ</Text>
                    <Text style={styles.menuAvatarTextSmall}>Làm chủ cột sống làm chủ sinh mệnh</Text>
                </View>
                <View style={{height:'62%',backgroundColor: '#fffad8',}}>
                    <ScrollView style={styles.scrollContainer}>
                    { 
                        this.props.listCategory1.map((category, index) => {
                            if(category.name_cat == "Liên Hệ Đào Tạo"){
                                return(
                                    <View style={styles.menuDropDownList} key={index}>
                                        <TouchableHighlight
                                            accessibilityLabel={'Tap to open category'}
                                            style={styles.menuButton}
                                            onPress={()=>{this._closeControlMenu().then(()=>{
                                                this._setView(category);
                                            })}}
                                            underlayColor='white'>
                                            <View style={styles.categoryTab}><View style={{width:25}}><Text><FontAwesome name='caret-up' color={'#ff1a1a'} style={styles.menuIconButton} /></Text></View><Text style={styles.menuBtnTextTab}>{category.name_cat.toUpperCase()}</Text></View>
                                        </TouchableHighlight>
                                    </View>
                                )
                            } else {
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
                            }
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
                    </ScrollView>
                </View>
            </View>
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
                    <Image style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }} source={require('./../images/bggreen.jpg')} />
                    <View style={styles.headerContainerClass}>
                        { this.props._route != 3 &&
                            <TouchableHighlight onPress={this._openControlMenu} style={styles.headerContainerMenuDisabled}>
                                <FontAwesome name='reorder' style={styles.menuHeader} />
                            </TouchableHighlight>
                        }
                        { this.props._route == 3 &&
                            <TouchableHighlight onPress={this._onBackMenu} style={styles.headerContainerMenuDisabled}>
                                <AntIcon name='arrowleft' style={styles.backHeader} />
                            </TouchableHighlight>
                        }
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 8,
                                flexDirection: 'column'
                            }}>
                                <Text style={styles.titleHeader}>{this.props.pageTitle.toUpperCase()}</Text>
                                { this.props._route == 1 &&
                                    <Text style={styles.menuAvatarTextSmallTitle}>Làm chủ cột sống làm chủ sinh mệnh</Text>
                                }
                            </View>
                            { this.props._route != 1 &&
                                <View style={styles.iconUserView}>
                                    <TouchableHighlight onPress={this._onSearch} style={styles.headerSearch}>
                                        <AntIcon name='search1' style={styles.iconSearch} />
                                    </TouchableHighlight>
                                </View>
                            }
                    </View>
                    {
                        this.props._route == 1 &&
                        <View style={{width:"100%",height:"82%", backgroundColor:"#fffad8"}}>
                            <View style={styles.mainCategoryView}>
                                <Image style={styles.menuIconMainView} source={require('./../images/iconmain.jpg')} />
                                <View style={{height:'68%', width:'100%'}}>
                                    <ScrollView style={styles.scrollContainer}>
                                    { 
                                        this.props.listCategory1.map((category, index) => {
                                            if(category.name_cat == "Liên Hệ Đào Tạo"){
                                                return(
                                                    <View style={styles.menuDropDownListMainView} key={index}>
                                                        <TouchableHighlight
                                                            accessibilityLabel={'Tap to open list class LS'}
                                                            style={styles.menuButton}
                                                            onPress={()=>{this._setView(category);}}
                                                            underlayColor='white'>
                                                            <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat.toUpperCase()}</Text></View>
                                                        </TouchableHighlight>
                                                    </View>
                                                )
                                            } else {
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
                                            }
                                        })
                                    }
                                    </ScrollView>
                                </View>    
                            </View>
                        </View>
                    }
                    { this.state.searchStatus &&
                        <View style={styles.containerSearch}>
                            <SearchInput 
                            onChangeText={(term) => { this._onSearchChange(term) }} 
                            style={styles.searchInput}
                            placeholder="Nhập vào nội dung tìm kiếm"
                            />
                            <ScrollView>
                            {this.state.searchResults.map((email,index) => {
                                return (
                                <TouchableOpacity onPress={()=>this._setViewSearch(email)} key={index} style={styles.emailItem}>
                                    <View>
                                    <Text style={styles.emailSubject}>{email.post_title}</Text>
                                    <Text style={styles.emailSubject2}>{email.name_cat}</Text>
                                    </View>
                                </TouchableOpacity>
                                )
                            })}
                            </ScrollView>
                        </View>
                    }
                    {
                        this.props._route == 2 && !this.state.searchStatus &&
                        <View style={{width:"100%",height:"82%", backgroundColor:"#fffad8"}}>
                            <View style={styles.mainCategoryView}>
                                <Image style={styles.menuIconMainView} source={require('./../images/iconmain.jpg')} />
                                <View style={{height:'70%', width:'100%'}}>
                                    <ScrollView style={styles.scrollContainer}>
                                    { 
                                        this.props.listCategory2.map((category, index) => {
                                            if (category.child.length == 0){
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
                                            } else {
                                                return(
                                                    <View style={styles.menuDropDownListMainView} key={index}>
                                                        <TouchableHighlight
                                                            accessibilityLabel={'Tap to open list class LS'}
                                                            style={styles.menuButton}
                                                            onPress={()=>{this._setSubView(category.child);}}
                                                            underlayColor='white'>
                                                            <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat ? category.name_cat.toUpperCase() : category.title.toUpperCase()}</Text></View>
                                                        </TouchableHighlight>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    }
                    {
                        this.props._route == 3 && !this.state.subView &&  !this.state.searchStatus &&
                        <View style={{height: '82%', backgroundColor:'#fffad8'}}>
                            <WebView
                                key={this.state.key}
                                originWhitelist={['*']}
                                source={{ baseUrl: '', html: this.props.contentView }}
                                injectedJavaScript={`const img = document.getElementsByTagName('p'); img.setAttribute('text-align: justify;'); `}
                                scalesPageToFit={true}
                                startInLoadingState={true}
                                onLoadEnd={() => {
                                    this.setState({loading: false});
                                }}
                                style={{height: '82%', backgroundColor:'#fffad8', marginLeft:10, marginRight:10, flex: 1}}
                            />
                            <TouchableHighlight
                                onPress={()=>{ this.setState({ key: this.state.key + 1 });}}
                                style={{
                                    position: 'absolute',
                                    right: '5%',
                                    bottom: '3%',
                                    marginBottom: 5,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text><AntIcon name='upcircle' size={25} color={'#015d01'} style={{ textAlignVertical: 'center', textAlign: 'center' }} /></Text>
                            </TouchableHighlight>
                        </View>
                    }
                    {
                        this.props._route == 3 && this.state.subView &&  !this.state.searchStatus &&
                        <View style={{width:"100%",height:"82%", backgroundColor:"#fffad8"}}>
                            <View style={styles.mainCategoryView}>
                                <Image style={styles.menuIconMainView} source={require('./../images/iconmain.jpg')} />
                                <View style={{height:'70%', width:'100%'}}>
                                    <ScrollView style={styles.scrollContainer}>
                                    { 
                                        this.state.subViewContent.map((category, index) => {
                                            return(
                                                <View style={styles.menuDropDownListMainView} key={index}>
                                                    <TouchableHighlight
                                                        accessibilityLabel={'Tap to open list class LS'}
                                                        style={styles.menuButton}
                                                        onPress={()=>{this._setView(category);}}
                                                        underlayColor='white'>
                                                        <View style={styles.category}><View style={{height:50}}><Text></Text></View><Text style={styles.menuBtnText}>{category.name_cat.toUpperCase()}</Text></View>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        })
                                    }
                                    </ScrollView>
                                </View>    
                            </View>
                        </View>
                    }
                    <View style={styles.footerContainerClass}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <Image style={styles.menuIconAvatarFooter} source={require('./../images/iconfooter.jpg')} />
                            <Text style={this.props._route == 1 ? styles.titleFooter1 :styles.titleFooter}>NHUẬN LỰC: 0986 880 998</Text>
                        </View>
                    </View>
                </View>
            </Drawer>
        );
    }

}

const styles = StyleSheet.create({
    containerSearch: {
        flex: 1,
        backgroundColor: '#fffad8',
        justifyContent: 'flex-start',
        zIndex:999999
    },
    emailItem:{
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 0.05*deviceWidth,
        fontWeight: 'bold'
    },
    emailSubject2: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 0.04*deviceWidth
    },
    searchInput:{
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        backgroundColor:'#fffad8',
        zIndex:999999
    },
    scrollContainer:{
        width:'100%'
    },
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover'
    },
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
        elevation: 5,
        width: '100%'
    },
    footerContainerClass: {
        height: '8%',
        flexDirection: 'row',
        elevation: 5,
        width: "100%"
    },
    menuHeader: {
        flex: 1,
        textAlign: 'center',
        fontSize: 0.06*deviceWidth,
        color: '#fff',
        textAlignVertical: 'center',
        lineHeight:deviceHeight*0.1
    },
    backHeader:{
        flex: 1,
        textAlign: 'center',
        fontSize: 0.06*deviceWidth,
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight:deviceHeight*0.1
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
        alignItems: 'center',
        marginBottom: 3,
        backgroundColor: 'rgba(94, 192, 0, 0.5)',
        height: '28%'
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
        fontSize: 0.04*deviceWidth,
        lineHeight:50
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
        fontSize: 0.06*deviceWidth,
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
    },
    menuAvatarTextSmall:{
        zIndex: 120000,
        color: '#ff2d16',
        textAlign: 'center',
        fontSize: 0.035*deviceWidth,
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
    },
    menuAvatarTextSmallTitle:{
        color: '#fff',
        fontSize: 0.03*deviceWidth,
        // textShadowColor:'#fff',
        // textShadowOffset:{width: 1, height: 1},
        // textShadowRadius:2,
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
        marginTop:5,
        width: 0.32*deviceWidth,
        height: 0.26*deviceWidth
    },
    menuIconAvatarFooter:{
        width: '18%',
        height: '100%',
        marginLeft: 0
    },
    menuIconMain:{
        marginTop: 20,
        width: '30%'
    },
    menuIconMainView:{
        width:'38%',
        height:'23%',
        marginTop:10,
        marginBottom: 10
    },
    headerContainerMenuDisabled: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerSearch: {
        marginRight: 3,
        flex: 1
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
        width: '10%',
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
        fontSize: 0.055*deviceWidth,
        fontWeight: '600',
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
        width: '100%',
        textAlign: 'center'
    },
    titleFooter: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 0.05*deviceWidth,
        flex: 1
    },
    titleFooter1: {
        color: '#ff2d16',
        textAlign: 'center',
        fontSize: 0.05*deviceWidth,
        fontWeight: 'bold',
        textShadowColor:'#fff',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:2,
        flex: 1
    },
    iconSearch: {
        flex: 1,
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 0.06*deviceWidth,
        textAlign: 'right',
        lineHeight:deviceHeight*0.1
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