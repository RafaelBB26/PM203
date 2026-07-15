import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [selectedMode, setSelectedMode] = useState('Presencial');
    const [reservationConfirmed, setReservationConfirmed] = useState(false);

    function selectMode(mode) {
        setSelectedMode(mode);
        setReservationConfirmed(false);
        setSheetVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reserva de clase</Text>
            <Text style={styles.subtitle}>React Native: Modal y Bottom Sheet</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Clase practica</Text>
                <Text style={styles.cardText}>Duracion: 40 minutos</Text>
                <Text style={styles.cardText}>Modalidad: {selectedMode}</Text>
                <Text style={styles.cardText}>
                    Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}
                </Text>
            </View>

            <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
                <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
            </Pressable>

            <Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.primaryButtonText}>Confirmar reserva</Text>
            </Pressable>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                statusBarTranslucent
                onShow={() => console.log('Modal de confirmacion abierto')}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Confirmar reserva</Text>
                        <Text style={styles.modalText}>
                            Deseas reservar la clase en modalidad {selectedMode}?
                        </Text>

                        <View style={styles.actionsRow}>
                            <Pressable
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.actionButton, styles.confirmButton]}
                                onPress={() => {
                                    setReservationConfirmed(true);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <BottomSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                title="Elige modalidad"
                height={330}
            >
                <Pressable style={styles.optionButton} onPress={() => selectMode('Presencial')}>
                    <Text style={styles.optionTitle}>Presencial</Text>
                    <Text style={styles.optionText}>Asiste al salon asignado.</Text>
                </Pressable>

                <Pressable style={styles.optionButton} onPress={() => selectMode('En linea')}>
                    <Text style={styles.optionTitle}>En linea</Text>
                    <Text style={styles.optionText}>Recibe el enlace de videollamada.</Text>
                </Pressable>

                <Pressable style={styles.optionButton} onPress={() => selectMode('Grabacion')}>
                    <Text style={styles.optionTitle}>Grabacion</Text>
                    <Text style={styles.optionText}>Consulta la clase despues.</Text>
                </Pressable>
            </BottomSheet>

            <StatusBar style="auto" />
        </View>
    );
}

function BottomSheet({
    visible,
    onClose,
    title,
    height = 320,
    closeOnBackdropPress = true,
    children,
}) {
    const translateY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : height,
            duration: visible ? 250 : 200,
            useNativeDriver: true,
        }).start();
    }, [height, translateY, visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.sheetOverlay}>
                <Pressable
                    style={styles.sheetBackdrop}
                    onPress={closeOnBackdropPress ? onClose : undefined}
                />

                <Animated.View
                    style={[
                        styles.sheetContainer,
                        { height, transform: [{ translateY }] },
                    ]}
                >
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>{title}</Text>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: '#1e3a8a',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#38bdf8',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0c4a6e',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#334155',
        marginBottom: 6,
    },
    primaryButton: {
        backgroundColor: '#14b8a6',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderColor: '#f97316',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#f97316',
        fontSize: 16,
        fontWeight: '700',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    modalCard: {
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 22,
        borderWidth: 1,
        borderColor: '#38bdf8',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0c4a6e',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#334155',
        marginBottom: 20,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#f97316',
    },
    confirmButton: {
        backgroundColor: '#0f766e',
    },
    cancelButtonText: {
        color: '#ea580c',
        fontWeight: '700',
    },
    confirmButtonText: {
        color: '#ffffff',
        fontWeight: '700',
    },
    sheetOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheetBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
    },
    sheetContainer: {
        backgroundColor: '#075985',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 24,
    },
    sheetHandle: {
        width: 44,
        height: 5,
        borderRadius: 999,
        backgroundColor: '#38bdf8',
        alignSelf: 'center',
        marginBottom: 16,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: 14,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#38bdf8',
        borderRadius: 8,
        padding: 14,
        marginBottom: 10,
        backgroundColor: '#e0f2fe',
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0369a1',
        marginBottom: 4,
    },
    optionText: {
        fontSize: 14,
        color: '#0f172a',
    },
});