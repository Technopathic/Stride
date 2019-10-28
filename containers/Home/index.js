import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as userActionCreators from '../../actions/userActions';

import { ScrollView, StyleSheet, Dimensions, View, TextInput, Text, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, Linking} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import moment from "moment";

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class Home extends React.PureComponent {
    state = {
        blocks:[],
        pause:false,
        activeBlock:0,
        activeInput: {},
        inputText:"",
        inputObject:{},
        inputDate: new Date(),
        imageArray:[],
        previewImageArray:[],
        fileInput:{},
        currentBranch: 'branchInitial',
        showDialog:false
    }

    componentDidMount() {
        this.setActive();
    }

    handleInputText = (text) => {
        this.setState({
            inputText:text
        })
    }

    handleDateInput = (date) => {
        this.setState({
            inputDate:date
        })
    }

    handleImage = () => {
        let imageArray = this.state.imageArray;
        let previewImageArray = this.state.previewImageArray;

        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if(response.data !== undefined) {
                if(imageArray.length < 8) {
                    let newImage = {
                        data: response.data,
                        rotation: response.originalRotation
                    }
                    imageArray.push(newImage);
                    previewImageArray.push('data:image/jpeg;base64,' + response.data)
                    this.setState({
                        imageArray: imageArray,
                        previewImageArray: previewImageArray
                    }, () => {
                        this.forceUpdate();
                    });
                }
                else {
                //this.showToast('You can only have 5 photos.');
                }
            }
        });
    };

    removeImage = (index) => {
        let imageArray = this.state.imageArray;
        let previewImageArray = this.state.previewImageArray;

        imageArray.splice(index, 1);
        previewImageArray.splice(index, 1);

        this.setState({
          imageArray:imageArray,
          previewImageArray:previewImageArray
        })
    };

    moveTo = (dest) => {
        this.props.userActions.clearList();
        this.setState({
            inputText:"",
            inputObject:{},
            blocks:[],
            currentBranch: dest.branch,
            activeBlock: dest.index
        }, () => {
            //this.setActive();
        })
    }

    setActive = () => {
        let data = this.props.story[this.state.currentBranch];
        let blocks = this.state.blocks;
        let pause = this.state.pause;
        let activeInput = {};
        let activeBlock = this.state.activeBlock;


        for(let i = activeBlock; i < data.length; i++) {
            ((i) => {
                if(this.state.blocks[this.state.blocks.length - 1] === undefined || this.state.blocks[this.state.blocks.length - 1].bot === true) {
                    setTimeout(() => {
                        if(pause === false) {
                            data[i].bot = true;
                            data[i].loading = true;
                            blocks.push(data[i]);

                            if(data[i].type === "options" || data[i].type === "input" || data[i].type === "imageInput" || data[i].type === "list" || data[i].type === "imageInput" || data[i].type === "dateInput") {
                                pause = true;
                                data[i].showOptions = true;
                                data[i].storage = "";
                                if(data[i].type === "options") {
                                    
                                    activeInput = {
                                        type:'options',
                                        options: data[i].options
                                    }
                                } else if(data[i].type === "input") {
                                    activeInput = {
                                        type: 'input',
                                        multi: data[i].multi,
                                        action: data[i].action
                                    }
                                } else if(data[i].type === "list") {
                                    activeInput = {
                                        type: 'list',
                                        data: data[i].data,
                                        action: data[i].action
                                    }
                                    this.useList(data[i].action);
                                } else if(data[i].type === "imageInput") {
                                    activeInput = {
                                        type: 'imageInput',
                                        data: data[i].data,
                                        action: data[i].action,
                                        required: data[i].required
                                    }
                                } else if(data[i].type === "dateInput") {
                                    activeInput = {
                                        type: 'dateInput',
                                        data: data[i].data,
                                        action: data[i].action,
                                        mode: data[i].mode
                                    }
                                }
                            }
                            this.setState({
                                blocks:blocks,
                                pause:pause,
                                activeBlock:i + 1,
                                activeInput: activeInput
                            }, () => {
                                //this.forceUpdate();
                                setTimeout(() => {
                                    let newBlocks = this.state.blocks;
                                    newBlocks[newBlocks.length - 1].loading = false;
                                    this.setState({
                                        blocks:newBlocks
                                    }, () => {
                                        //this.forceUpdate();
                                    })
                                }, 800)
                            })
                        }
                    }, 500 * i)
                } else {
                    setTimeout(() => {
                        if(pause === false) {
                            data[i].bot = true;
                            data[i].loading = true;
                            blocks.push(data[i]);
                            if(data[i].type === 'options' || data[i].type === 'input' || data[i].type === 'imageInput' || data[i].type === "list" || data[i].type === "imageInput" || data[i].type === 'dateInput') {
                                pause = true;
                                data[i].showOptions = true;
                                data[i].storage = "";
                                if(data[i].type === "options") {
                                    activeInput = {
                                        type:'options',
                                        options: data[i].options
                                    }
                                } else if(data[i].type === "input") {
                                    activeInput = {
                                        type: 'input',
                                        multi: data[i].multi,
                                        action: data[i].action
                                    }
                                } else if(data[i].type === "list") {
                                    activeInput = {
                                        type: 'list',
                                        data: data[i].data,
                                        action: data[i].action,
                                    }
                                    this.useList(data[i].action);
                                } else if(data[i].type === "imageInput") {
                                    activeInput = {
                                        type: 'imageInput',
                                        data: data[i].data,
                                        action: data[i].action,
                                        required: data[i].required
                                    }
                                } else if(data[i].type === "dateInput") {
                                    activeInput = {
                                        type: 'dateInput',
                                        data: data[i].data,
                                        action: data[i].action,
                                        mode: data[i].mode
                                    }
                                }
                            }

                            this.setState({
                                blocks:blocks,
                                pause:pause,
                                activeBlock: i + 1,
                                activeInput: activeInput
                            }, () => {
                                //this.forceUpdate();
                                setTimeout(() => {
                                    let newBlocks = this.state.blocks;
                                    newBlocks[newBlocks.length - 1].loading = false;
                                    this.setState({
                                        block:newBlocks
                                    }, () => {
                                        //this.forceUpdate();
                                    })
                                }, 800);
                            })
                        }
                    }, 500 * i)
                }
            })(i)
        }
    }



    useOption = (text, action, branch = null) => {
        let blocks = this.state.blocks;
        let item = { type: "text", data:text, bot:false};
        let func = new Function("_this", "input", action);
        blocks.push(item);

        this.setState({
            blocks:blocks
        }, () => {
            func(this, this.state.inputObject);
            if(branch !== null) {
                this.setState({
                    currentBranch: branch,
                    activeBlock:0,
                    pause: false,
                    activeInput:{}
                }, () => {
                    this.setActive();
                })
            } else {
                this.setState({
                    pause: false,
                    activeInput:{}
                }, () => {
                    this.setActive();
                })
            }
        })
    }

    useInput = (action) => {
        let blocks = this.state.blocks;
        let item = { type: "text", data:this.state.inputText, bot:false };
        let func = new Function("_this", "input", action);
        blocks.push(item);

        this.setState({
            blocks:blocks
        }, () => {
            func(this, this.state.inputText);
            this.setState({
                pause:false,
                activeInput:{},
                inputText:""
            }, () => {
                Keyboard.dismiss();
                this.setActive();
            })
        })
    }

    useList = (action) => {
        let pause = this.state.pause;
        let activeBlock = this.state.activeBlock;
        let func = new Function("_this", "input", action);
        func(this, this.state.inputObject);

        if(this.props.story[this.state.currentBranch].length > this.state.activeBlock) {
            pause = false;
            activeBlock = activeBlock + 1;
        }
        this.setState({
            pause:pause,
            inputObject:{},
            activeBlock: activeBlock
        }, () => {
            this.setActive();
        })
        
    }

    useImages = (action) => {
        let func = new Function("_this", "input", action);
        func(this, this.state.imageArray);

        this.setState({
            pause:false,
            activeInput:{}
        }, () => {
            this.forceUpdate();
            this.setActive();
        })
    }

    useDialog = (data = {}) => {
        this.props.userActions.setActiveDialog(data);

        this.setState({
            showDialog:!this.state.showDialog
        })
    }

    useDate = (action) => {
        let blocks = this.state.blocks;
        let item = { type: "text", data: moment(this.state.inputDate).calendar(), bot:false};
        let func = new Function("_this", "input", action);
        blocks.push(item);

        this.setState({
            blocks:blocks
        }, () => {
            func(this, this.state.inputDate);
            this.setState({
                pause:false,
                activeInput:{},
                inputDate: new Date()
            }, () => {
                this.setActive();
            })
        })
    }

    addToObject = (input) => {
        let inputObject = this.state.inputObject;
        Object.assign(inputObject, input);
        this.setState({
            inputObject: inputObject,
        })
    }

    addBlock = (input) => {
        let blocks = this.state.blocks;
        let item = {type:"text", data:input, bot:true, loading:true};
    
        setTimeout(() => {
          blocks.push(item);
    
          this.setState({
            blocks:blocks
          }, function() {
            //_this.forceUpdate();
          })
        }, 800)
    }

    renderDialog = () => {
        let dialogContainer = {
            position:'absolute',
            left:30,
            top:30,
            width:Dimensions.get('window').width - 60,
            height:Dimensions.get('window').height - 100,
            backgroundColor:'#FFFFFF',
            flex:0,
            flexDirection:'column',
            elevation:10,
            borderRadius:5,
            padding:15
        };

        let imageContainer = {
            backgroundColor:'#EEEEEE',
            height:100,
            width:100,
            borderRadius:50
        };

        let reviewsContainer = {
            marginTop:10,
            flex:0,
            flexDirection:'column',
            paddingBottom:30
        };

        let reviewBlock = {
            flex:0,
            flexDirection:'column',
            borderBottomWidth:1,
            borderBottomColor:"#EEEEEE",
            paddingTop:10,
            paddingBottom:10
        };

        let dialogHeader = {
            flex:0,
            flexDirection:'row',
            alignItems:'center',
            borderBottomWidth:1,
            borderBottomColor:'#EEEEEE',
            paddingBottom:15
        };

        let dialogInfo = {
            marginLeft:15
        };

        let dialogContent = {
            flex:0,
            flexDirection:'column',
            marginTop:10
        };

        let dialogButton = {
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:60,
            backgroundColor:'#E73C7E',
            borderRadius:5,
            elevation:5,
            marginTop:15,
            marginBottom:15,
            marginLeft:5
        };

        
        let closeButton = {
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:60,
            backgroundColor:'#EEEEEE',
            borderRadius:5,
            marginTop:15,
            marginBottom:15,
            marginRight:5
        };

        let imageGallery = {
            flex:0,
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',
            paddingBottom:10,
            borderBottomWidth:1,
            borderBottomColor:"#EEEEEE",
        };

        let imageBlock = {
            backgroundColor:'#EEEEEE',
            width:(Dimensions.get('window').width - 130) / 4,
            height: (Dimensions.get('window').width - 130) / 4,
            borderRadius:5,
            margin:5
        };

        if(this.state.showDialog) {
            return (
                <ScrollView style={dialogContainer}>
                    <View style={dialogHeader}>
                        {this.props.activeDialog.images.length > 0 ?
                            <Image style={imageContainer} source={{uri: this.props.activeDialog.images[0]}} />
                            : <View style={imageContainer}></View>
                        }
                        <View style={dialogInfo}>
                            <Text style={{fontSize:18}}>{this.props.activeDialog.name}</Text>
                            <View style={{flex:0, flexDirection:'row'}}>
                                <Text>{this.props.activeDialog.gender} - </Text>
                                <Text>{this.props.activeDialog.age} Years - </Text> 
                                <Text>{this.props.activeDialog.score} Rep</Text> 
                            </View>
                        </View>
                    </View>
                    <View style={dialogContent}>
                        
                    </View>
                </ScrollView>
            )
        } 
    }

    renderBlock = (block, i) => {
        const chatLeft = {
            flex:0,
            flexDirection:'row',
            minHeight:100,
            marginBottom:-12
        };

        const chatBlock = {
            backgroundColor:"#222222",
            margin:10,
            borderRadius:3,
            color:"#FFFFFF",
            flex:0,
            flexDirection:'column',
            justifyContent:'center',
            paddingLeft:30,
            paddingRight:30,
        };

        const chatRight = {
            flex:0,
            flexDirection:'row-reverse',
            minHeight:100
        };

        const myBlock = {
            backgroundColor:'#E73C7E',
            margin:10,
            borderRadius:3,
            color:"#FFFFFF",
            flex:0,
            flexDirection:'column',
            justifyContent:'center',
            paddingLeft:30,
            paddingRight:30
        };

        const loadChat = {
            flex:0,
            flexDirection:'row',
            minHeight:100,
            marginBottom:-12
        };

        const loadMessage = {

        };

        const blueLine = {

        };

        const redLine = {

        };

        const innerBlock = {
            color:'#FFFFFF',
            fontSize:16
        };

        const linkBlock = {
            color: '#E73C7E',
            fontSize: 16,
            textTransform:'uppercase',
            fontWeight:'bold',
            fontFamily:'Roboto'
        };

        const chatImage = {
            flex:1,
            width:Dimensions.get('window').width - 80,
            marginTop:30,
            marginBottom:30,
            minHeight:300
        };

        const optionsContainer = {
            flex:0,
            flexDirection:'column',
            marginLeft:90,
            marginTop:15
        };

        const optionsTitle = {
            fontWeight:'bold',
            color:"#FFFFFF",
            fontSize:32,
            marginBottom:10,
            textTransform:'uppercase'
        };

        const blockList = {
            flex:0,
            flexDirection:'column',
            padding:10,
        }

        let chatStyle = chatLeft;
        let blockStyle =  chatBlock;

        if(block.bot === false) {
            chatStyle = chatRight;
            blockStyle = myBlock;
        }

        if(block.isLoading === true) {
            return (
                <View style={loadChat} key={i}>
                    <View style={blockStyle}>
                        <View style={loadMessage}>
                            <View style={blueLine}></View>
                            <View style={redLine}></View>
                            <View style={blueLine}></View>
                        </View>
                    </View>
                </View>
            )
        } else {
            if(block.type === "text") {
                return (
                    <View style={chatStyle} key={i}>
                        <View style={blockStyle}>
                            <Text style={innerBlock}>{block.data}</Text>
                        </View>
                    </View>
                )
            } else if(block.type === "image") {
                /*Image.getSize(this.props.uri, (width, height) => {

                }*/
                return (
                    <View style={chatStyle} key={i}>
                        <View style={blockStyle}>
                            <Image source={{uri: block.data}} style={chatImage} />
                        </View>
                    </View>
                )

            } else if(block.type === "imageArray") {
                
                
            } else if(block.type === "link") {
                return (
                    <View style={chatStyle} key={i}>
                        <View style={blockStyle}>
                            <Text style={linkBlock} onPress={() => Linking.openURL(block.data)}>
                                {block.text}
                            </Text>
                        </View>
                    </View>
                )

            } else if(block.type === "options") {
                return (
                    <View style={{marginBottom:10}} key={i}>
                        <View style={chatStyle}>
                            <View style={blockStyle}>
                                <Text style={innerBlock}>{block.data}</Text>
                            </View>
                        </View>
                    </View>
                )

            } else if(block.type === "input") {
                return (
                    <View style={{marginBottom: 10}} key={i}>
                        <View style={chatStyle}>
                            <View style={blockStyle}>
                                <Text style={innerBlock}>{block.data}</Text>
                            </View>
                        </View>
                    </View>
                )

            } else if(block.type === "list") {
                return (
                    <View style={{marginBottom:10}}>
                        <View style={chatStyle} key={i}>
                            <View style={blockStyle}>
                                <Text style={innerBlock}>{block.data}</Text>
                            </View>
                        </View>
                        <View style={blockList}>
                            {this.props.activeList.map((item, i) => (
                                <TouchableOpacity onPress={() => this.useDialog(item)} style={{backgroundColor:'#EEEEEE', padding:10, marginBottom:10, borderRadius:5}} key={i}>
                                    <View style={{flex:0, flexDirection:'row', borderRadius:5}} key={i}>
                                        {item.images ? 
                                            item.images.length > 0 ?
                                                <Image source={{uri:item.images[0]}} style={{height:60, width:60, backgroundColor:'#AAAAAA', borderRadius:30}} />
                                                : <View style={{height:60, width:60, backgroundColor:'#AAAAAA', borderRadius:30}}></View>
                                            : null
                                        }
                                      
                                        <View style={{flex:1, flexDirection:'column', marginLeft:10, justifyContent:'center'}}>
                                            <Text style={{color:'#222222', fontSize:18}}>{item.displayTitle}</Text>
                                            <Text style={{color:'#888888'}}>{item.displayCover}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )

            } else if(block.type === "imageInput") {
                return (
                    <View style={chatStyle} key={i}>
                        <View style={blockStyle}>
                            <Text style={innerBlock}>{block.data}</Text>
                        </View>
                    </View>
                )
            } else if(block.type === "dateInput") {
                return (
                    <View style={chatStyle} key={i}>
                        <View style={blockStyle}>
                            <Text style={innerBlock}>{block.data}</Text>
                        </View>
                    </View>
                )
            }
        }
    }

    renderMainContent = () => {
        const mainContent = {
            flex:1,
            flexDirection:'column',
            width:Dimensions.get('window').width,
            paddingBottom:30
        };

        const mainLoading = {

        };

        const blueLine = {

        };

        const redLine = {

        };

        const logoContainer = {
            flex:1,
            alignItems:'center',
        };

        const logoStyle = {
            width:300,
            height:182
        };

        if(this.props.mainLoading) {
            return (
                <View style={mainContent}>
                    <View style={mainLoading}>
                        <View style={blueLine}></View>
                        <View style={redLine}></View>
                        <View style={blueLine}></View>
                    </View>
                </View>
            )
        } else {
            return (
                <ScrollView style={mainContent} 
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                >
                    <View style={logoContainer}>
                        <Image source={require('../../images/logo.png')} style={logoStyle}/>
                    </View>
                    {this.state.blocks.map((block, i) => (
                        this.renderBlock(block, i)
                    ))}
                </ScrollView>
            )
        }
    }

    renderFooterInput = () => {
        const footerTextInput = {
            flex:0, 
            flexDirection:'row', 
            justifyContent:'space-between', 
            alignItems:'center', 
            padding:5, 
            backgroundColor:'#222222',
            maxHeight:60,
            width: Dimensions.get('window').width
        };
        
        const footerInput = {
            backgroundColor:'#555555',
            flex:1,
            borderRadius:5,
            height:36,
            padding:10,
            color:"#EEEEEE"
        };
        
        const footerSubmitButton = {
            width:50,
            height:50
        };

        const footerOptionsInput = {
            flex:0,
            flexDirection:'row',
            flexWrap:'wrap',
        };

        const optionsButton = {
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#222222',
            padding:5,
            minHeight:60,
            elevation:5,
            margin:5,
            minWidth:(Dimensions.get('window').width / 4) - 10,
            borderRadius:5
        };

        const imageInputContainer = {
            flex:0,
            flexDirection:'column'
        };

        const imageInputOptions = {
            flex:0,
            flexDirection:'row'
        };

        const imageInputContent = {
            height:60,
            backgroundColor:'#EEEEEE',
            flex:0,
            flexDirection:'row',
            alignItems:'center',
            paddingLeft:5,
            paddingRight:5
        };

        const imageInputButton = {
            borderWidth:2,
            borderColor:'#999999',
            borderStyle:'dashed',
            height:50,
            width:50,
            borderRadius:1,
            flex:0,
            alignItems:'center',
            justifyContent:'center'
        }

        const clearInputButton = {
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#DDDDDD',
            padding:5,
            minHeight:60,
            margin:5,
            minWidth:(Dimensions.get('window').width / 4) - 10,
            borderRadius:5
        }

        if(this.state.activeInput.type === 'input') {
            return (
                    <View style={footerTextInput}>
                        <TextInput
                            onChangeText={(text) => this.handleInputText(text)}
                            value={this.state.inputText}
                            placeholder="Type your Answer here..."
                            returnKeyType="send"
                            onSubmitEditing={() => this.useInput(this.state.activeInput.action)}
                            placeholderTextColor="#DDDDDD"
                            style={footerInput}
                            multiline={this.state.activeInput.multi}
                        />
                        <TouchableOpacity style={{paddingLeft:5}} onPress={() => this.useInput(this.state.activeInput.action)}>
                            <Icon name="send" size={25} color="#DDDDDD" />
                        </TouchableOpacity>
                    </View>
            )
        }
        else if(this.state.activeInput.type === 'options') {
            return (
                <View style={footerOptionsInput}>
                    {this.state.activeInput.options.map((option, i) => (
                        <TouchableOpacity style={optionsButton} key={i} onPress={() => this.useOption(option.data, option.action, option.switchBranch)}>
                            <Text style={{color:'#FFFFFF', fontSize:16, textAlign:'center'}}>{option.data}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            )
        } else if(this.state.activeInput.type === 'imageInput') {
            return (
                <View style={imageInputContainer}>
                    <View style={imageInputOptions}>
                        {this.state.activeInput.required === false ?
                            <TouchableOpacity style={clearInputButton}>
                                <Text style={{color:'#222222', fontSize:16, textAlign:'center'}}>Not Now</Text>
                            </TouchableOpacity>
                            : null
                        }
                        <TouchableOpacity style={optionsButton} onPress={() => this.useImages(this.state.activeInput.action)}>
                            <Text style={{color:'#FFFFFF', fontSize:16, textAlign:'center'}}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={imageInputContent}>
                        <TouchableOpacity style={imageInputButton} onPress={this.handleImage}>
                            <Icon name="image" size={35} color="#999999"/>
                        </TouchableOpacity>
                        <ScrollView horizontal={true} style={{marginLeft:5}}>
                            {this.state.previewImageArray.map((image, i) => (
                                <Image style={{width:50, height:50, margin:3, borderRadius:3}} source={{uri:image}} key={i} onPress={()=> this.removeImage(i)} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            )
        } else if(this.state.activeInput.type === 'dateInput') {
            return (
                <View style={{flex:0, flexDirection:'column', paddingBottom:50}}>
                    <DatePicker
                        date={this.state.inputDate}
                        onDateChange={date => this.handleDateInput(date)}
                        mode={this.state.activeInput.mode}
                    />
                    <TouchableOpacity style={optionsButton} onPress={() => this.useDate(this.state.activeInput.action)}>
                        <Text style={{color:'#FFFFFF', fontSize:16, textAlign:'center'}}>Set Date</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderMainContent()}
                {this.renderFooterInput()}
                {this.renderDialog()}            
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
      flex:1
  },
  headerContainer: {
      height:50,
      backgroundColor:'#EEEEEE',
      width:Dimensions.get('window').width
  },
  mainContent: {
      flex:1,
  }
})

function mapStateToProps(state) {
  return {
      story: state.getIn(['story', 'story'], Immutable.List()),
      activeList: state.getIn(['user', 'activeList'], Immutable.List()),
      activeDialog: state.getIn(['user', 'activeDialog'], Immutable.List()),
      user: state.getIn(['user', 'user'], Immutable.List())
  }
}

function mapDispatchToProps(dispatch) {
  return {
      userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect( mapStateToProps, mapDispatchToProps ) (Home);