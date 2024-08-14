import React, { useState, useContext, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Notification from "../Notification";
import { NotificationContext } from "../../../hooks/useNotificationContext";

const NotificationList = () => {
    const { loadNotification, notificationData, deleteNotification, clearNotificationList } = useContext(NotificationContext);

    useEffect(() => {
        (async () => {
            try {
                const data = await loadNotification();

            } catch (error) {
                console.log("Error fetching data:", error);
            }
        })();
    }, []);

    const deleteData = async (id) => {
        try {
            await deleteNotification(id);
        }
        catch (error) {
            console.log("Error removing notification..", error)
        }

    }

    const deleteSingleItem = async (id)=>{
        Alert.alert("Are you sure!", "Your notification will be deleted", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => deleteData(id) },
        ])
    }
    const renderListItem = ({ item }) => (
        <View style={styles.listItem}>
            <View style={styles.notificationContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.body}</Text>
                <Text>{item.currentDate}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteSingleItem(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
    const deleteAllNotifications = async () => {

        Alert.alert("Are you sure!", "Your all notification data will be deleted", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: clearNotifications },
        ])


    }

    const clearNotifications = async () => {
        await clearNotificationList()
    }

    return (
        <View>
            {notificationData.length > 0 && (<TouchableOpacity
                style={styles.deleteAllButton}
                onPress={deleteAllNotifications}
            >
                <Text style={styles.deleteAllButtonText}>Delete All</Text>
            </TouchableOpacity>)}
            <FlatList
                data={notificationData}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />


        </View>

    );

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        marginBottom: 0,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFA500'
    },
    notificationContent: {
        flex: 1,
    },
    deleteButton: {
        marginRight: 12,
        color: '#2196F3'
    },
    deleteButtonText: {
        color: '#2196F3',
    },
    deleteAllButton: {
        marginBottom: 10,
        alignSelf: 'flex-end', // Align the button to the right
        marginRight: 10, // Add some right margin for spacing
        marginTop: 20, // Add some top margin for spacing
        backgroundColor: '#dc3545', // Example background color
        padding: 10, // Example padding
        borderRadius: 5, // Make the button rounded
    },
    deleteAllButtonText: {
        color: 'white', // Example text color
        fontWeight: 'bold', // Example text style
    },
});


export default NotificationList