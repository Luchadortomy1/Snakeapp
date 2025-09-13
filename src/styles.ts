import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 40,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  pauseBtn: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  pauseText: {
    fontSize: 16,
    color: '#333',
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
  },
  board: {
    marginTop: 0,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
  },
  snake: {
    backgroundColor: '#0f0',
  },
  food: {
    backgroundColor: '#f00',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOver: {
    fontSize: 28,
    color: '#333',
    marginBottom: 20,
  },
  restartBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  tapToStartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  tapToStartText: {
    fontSize: 24,
    color: '#333',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});

export default styles;
