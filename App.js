import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { useWatchListState } from './useWatchListState';

export default function App() {
  const { 
    providers, 
    movies, 
    tvShows, 
    addMovie, 
    addTvShow,
    incrementEpisode,
    incrementSeason,
    toggleMovieStatus
  } = useWatchListState();

  const [title, setTitle] = useState('');
  const [selectedProviderId, setSelectedProviderId] = useState('1');

  const handleAddMovie = () => {
    if (title.trim() === '') return;
    addMovie(title, selectedProviderId);
    setTitle('');
  };

  const handleAddTvShow = () => {
    if (title.trim() === '') return;
    addTvShow(title, selectedProviderId);
    setTitle('');
  };

  const getProviderName = (id) => {
    const provider = providers.find(p => p.id === id);
    return provider ? provider.name : 'Unknown';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>WatchList Assistant</Text>

      {/* Input Section */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Movie or TV Show Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.subLabel}>Select Provider:</Text>
        <View style={styles.providerSelectorRow}>
          {providers.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={[
                styles.providerButton,
                selectedProviderId === provider.id && styles.providerButtonSelected
              ]}
              onPress={() => setSelectedProviderId(provider.id)}
            >
              <Text style={selectedProviderId === provider.id ? styles.textSelected : styles.textUnselected}>
                {provider.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Button title="Add Movie" onPress={handleAddMovie} />
          <Button title="Add TV Show" onPress={handleAddTvShow} />
        </View>
      </View>

      {/* Combined Lists Display */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionHeader}>Tracking Items</Text>
        
        <FlatList
          data={[...movies.map(m => ({...m, type: 'Movie'})), ...tvShows.map(t => ({...t, type: 'TV Show'}))]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.infoColumn}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  {item.type === 'Movie' && (
                    <Text style={styles.statusBadge}>
                      {item.status === 'toWatch' ? 'To Watch' : 'Watched'}
                    </Text>
                  )}
                </View>
                <Text style={styles.itemSubtext}>
                  {item.type} • {getProviderName(item.providerId)}
                </Text>
              </View>

              {/* Dynamic Logic Controls based on type */}
              <View style={styles.controlRow}>
                {item.type === 'Movie' ? (
                  <Button 
                    title={item.status === 'toWatch' ? "Mark Seen" : "Watch Again"} 
                    onPress={() => toggleMovieStatus(item.id)} 
                  />
                ) : (
                  <View style={styles.tvControls}>
                    <Text style={styles.progressText}>S{item.currentSeason} E{item.currentEpisode}</Text>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.smallButton} onPress={() => incrementEpisode(item.id)}>
                        <Text style={styles.smallButtonText}>+Ep</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.smallButton} onPress={() => incrementSeason(item.id)}>
                        <Text style={styles.smallButtonText}>+Seas</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 6,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  providerSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  providerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  providerButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  textUnselected: {
    color: '#333',
  },
  textSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    flexShrink: 1,
  },
  itemSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  controlRow: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  tvControls: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  smallButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 4,
  },
  smallButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});