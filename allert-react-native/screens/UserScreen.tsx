import { StyleSheet, Text, TouchableOpacity, View, Switch, ScrollView, StatusBar } from 'react-native'
import { auth, signOut } from '../firebase';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import React, { useState, useEffect }from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const UserScreen = () => {
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

    useFocusEffect(
        React.useCallback(() => {
        retrieveUserSettingsFromDatabase()
    }, [])
    );

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
                            {item.enabled && <AntDesign style={styles.switchLabelIcon} name="flag" size={24} />}
                        </View>
                        
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={ () => updateUserSettingsInDatabase(auth.currentUser.uid, parseUserSettings(checkListState)) }
                        style={styles.updateButton}
                    >
                        <Text style={styles.buttonText}>
                            Update Settings
                        </Text>
                    </TouchableOpacity>

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
        backgroundColor: "#ffa268",
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