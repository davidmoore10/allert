import { StyleSheet, Text, TouchableOpacity, View, Switch, ScrollView, StatusBar } from 'react-native'
import { auth, signOut } from '../firebase';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import React, { useState, useEffect }from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const UserScreen = ({navigation}) => {
    const [checkListState, setCheckListState] = useState([
            {
                "name": "celery",
                "enabled": true
            },
            {
                "name": "crustaceans",
                "enabled": true
            },
            {
                "name": "eggs",
                "enabled": true
            },
            {
                "name": "fish",
                "enabled": true
            },
            {
                "name": "gluten",
                "enabled": true
            },
            {
                "name": "lupin",
                "enabled": true
            },
            {
                "name": "milk",
                "enabled": true
            },
            {
                "name": "molluscs",
                "enabled": true
            },
            {
                "name": "mustard",
                "enabled": true
            },
            {
                "name": "nuts",
                "enabled": true
            },
            {
                "name": "sesame seeds",
                "enabled": true
            },
            {
                "name": "soybeans",
                "enabled": true
            },
            {
                "name": "sulphites",
                "enabled": true
            },
        ])
    
    const [userHistoryState, setUserHistoryState] = useState<any[]>([])

    useFocusEffect(
        React.useCallback(() => {
        retrieveUserHistoryFromDatabase()
        retrieveUserSettingsFromDatabase()
    }, [])
    );

    const handleLogout = () => {
        signOut(auth).then(
            () => {
                auth.updateCurrentUser(null)
                console.log("Logged Out")
            })
            .catch(error => alert(error.message))
    }

    const parseUserSettings = (list) => {
        let reducedList = list.reduce(
            (obj, item) => Object.assign(obj, { [item.name]: item.enabled }), {});
        return(reducedList)
    }

    const retrieveUserSettingsFromDatabase = () => {
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const reference = ref(db, "users/" + userId + "/userFlags");

        onValue(reference, (snapshot) => {
            const string = JSON.stringify(snapshot)
            const data = JSON.parse(string);
            let result = Object.keys(data)
                   .map(key => (
                        {
                            "name": key,
                            "enabled": data[key],
                        }
                    ));
            setCheckListState(result);
        });
    }

    const retrieveUserHistoryFromDatabase = () => {
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const reference = ref(db, "users/" + userId + "/userHistory");

        onValue(reference, (snapshot) => {
            let result: any = []
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                const string = JSON.stringify(childData)
                const data = JSON.parse(string);
                result.push(data)
              });
            setUserHistoryState(result)
        });
    }

    const updateUserSettingsInDatabase = (userId: string, settings: any)  => {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId);
        update(reference, { userFlags: settings});
    }

    const convertTimestamp = (timestamp: string) => {
        let date = new Date(timestamp);

        return(
          date.getDate()
          + "/"+(date.getMonth()+1)
          + "/"+date.getFullYear()
          + " "+date.getHours()+ ":"
          + date.getMinutes()+ ":"
          + date.getSeconds()
        );
    } 

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>

            <View style={styles.sectionHeader}>
                    <Text style={styles.heading}>
                        Scanning History
                    </Text>
            </View>

            <View style={styles.buttonContainer}>

                { userHistoryState.length > 0 ? (

                    userHistoryState.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={ () => navigation.navigate("History", { props: item } ) }
                            style={[styles.historyButton]}
                        >
                        <Entypo style={styles.imageIcon} name="image" size={24} />
                        <Text style={ item.results.length === 0 ? styles.blackText : styles.redText }>
                            { item.results.length === 0 ? "No Flags" : "Allergens Flagged" }
                        </Text>
                        <Text style={ styles.blackText }>
                            {convertTimestamp(item.timestamp) }
                        </Text>
                        </TouchableOpacity>
                    ))

                ) : (
                    <TouchableOpacity
                            onPress={ () => {} }
                            style={[styles.historyButton]}
                        >
                        <Text style={styles.buttonOutlineText}>
                            No user history found.
                        </Text>
                    </TouchableOpacity>
                )
            }

                

                    
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.heading}>
                        Allergen Flags
                    </Text>
                </View>

                <View style={styles.checkboxContainer}>
                    {checkListState.map((item, index) => (
                        <View key={index} style={styles.checkbox}>
                            <Switch
                                trackColor={{ false: "#ff7f84", true: "#19bc8c" }}
                                thumbColor={item.enabled ? "#ababac" : "#ababac"}
                                ios_backgroundColor="#3e3e3e"
                                style={styles.switch}
                                onValueChange={ () => {setCheckListState(
                                            checkListState.map((obj, i) => 
                                                i === index ? 
                                                {...obj, "enabled" : !item.enabled} 
                                                : obj 
                                        ))
                                        }
                                    }
                                value={item.enabled}
                            />
                            <Text style={styles.switchLabel}>
                            { item.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }
                            </Text>
                            {item.enabled ? <AntDesign style={styles.switchLabelIcon} name="flag" size={24} /> : null}
                        </View>
                        
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={ () => updateUserSettingsInDatabase(auth.currentUser.uid, parseUserSettings(checkListState)) }
                        style={styles.updateButton}
                    >
                        <Text style={styles.whiteText}>
                            Update Settings
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={ handleLogout }
                    style={[styles.signOutButton, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scroll: {
    },
    sectionHeader: {
        alignSelf: "center",
        width: "90%",
        borderBottomWidth: 0.5,
        padding: 5,
        borderColor: "#c5c5c5",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxContainer: {
        width: "90%",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
    },
    button: {
        backgroundColor: "#0782f9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    historyButton: {
        width: "100%",
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: "#c5c5c5",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    signOutButton: {
        width: "80%",
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: "center",
    },
    updateButton: {
        backgroundColor: "#8fc865",
        width: "80%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#ff7f84",
        borderWidth: 2,
    },
    whiteText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    blackText: {
        color: "black",
        fontWeight: "700",
        fontSize: 16,
    },
    redText: {
        color: "#ff7f84",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#ff7f84",
        fontWeight: "700",
        fontSize: 16,
    },
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    switchLabel: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    switchLabelIcon: {
        marginLeft: "auto"
    },
})