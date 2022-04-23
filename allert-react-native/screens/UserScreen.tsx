import { StyleSheet, Text, TouchableOpacity, View, Switch, ScrollView, StatusBar } from 'react-native'
import { auth, signOut } from '../firebase';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import React, { useState, useEffect }from 'react';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
    const [checkListState, setCheckListState] = useState([
            {
                "name": "celery",
                "enabled": false,
            },
            {
                "name": "crustaceans",
                "enabled": false
            },
            {
                "name": "eggs",
                "enabled": false
            },
            {
                "name": "fish",
                "enabled": false
            },
            {
                "name": "gluten",
                "enabled": false
            },
            {
                "name": "lupin",
                "enabled": false
            },
            {
                "name": "milk",
                "enabled": false
            },
            {
                "name": "molluscs",
                "enabled": false
            },
            {
                "name": "mustard",
                "enabled": false
            },
            {
                "name": "nuts",
                "enabled": false
            },
            {
                "name": "sesame seeds",
                "enabled": false
            },
            {
                "name": "soybeans",
                "enabled": false
            },
            {
                "name": "sulphites",
                "enabled": false
            },
        ])

    useEffect( () => {
        //retrieveUserSettingsFromDatabase();
        console.log(checkListState)
    }, [checkListState])

    const handleLogout = () => {
        signOut(auth).then(
            () => {
                console.log("Logged Out")
            })
            .catch(error => alert(error.message))
    }

    const parseUserSettings = (list) => {
        let reducedList = list.reduce(
            (obj, item) => Object.assign(obj, { [item.name]: item.enabled }), {});
        return(JSON.stringify(reducedList))
    }

    const retrieveUserSettingsFromDatabase = () => {
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const reference = ref(db, "users/" + userId + "/userFlags");

        onValue(reference, (snapshot) => {
            const data = JSON.parse(snapshot.val());
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

    const updateUserSettingsInDatabase = (userId: string, settings: string)  => {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId);
        set(reference, { userFlags: settings});
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.historyContainer}>
                    <TouchableOpacity
                    style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            AAAAAAAAAAAAAAAAA
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    {checkListState.map((item, index) => (
                        <View key={index} style={styles.checkbox}>
                            <Switch
                                trackColor={{ false: "#666B7A", true: "#19bc8c" }}
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
                        </View>
                        
                    ))}

                    <TouchableOpacity
                        onPress={ () => updateUserSettingsInDatabase(auth.currentUser.uid, parseUserSettings(checkListState)) }
                        style={styles.updateButton}
                    >
                        <Text style={styles.buttonText}>
                            Update Settings
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                    onPress={ handleLogout }
                    style={styles.signOutButton}
                    >
                        <Text style={styles.buttonText}>
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
        paddingBottom: 400,
    },
    scroll: {
    },
    buttonContainer: {
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
    },
    historyContainer: {
        backgroundColor: "yellow",
        height: "40%",
        marginTop: 50,
    },
    button: {
        backgroundColor: "#0782f9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: 'flex-end'
    },
    signOutButton: {
        backgroundColor: "#ff7f84",
        width: "60%",
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: "center",
    },
    updateButton: {
        backgroundColor: "#8fc865",
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782f9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782f9",
        fontWeight: "700",
        fontSize: 16,
    },
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
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
})