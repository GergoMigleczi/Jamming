import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
                    searchResults: [],
                    playlistName: 'playlist1',
                    playlistTracks: []
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
    }

  addTrack(track){
    let list = this.state.playlistTracks;
    let listContains = false;
    for(var item of list){
      if(item.id === track.id){
        listContains = true;
      }
    }

    if(!listContains){
      list.push(track);
      this.setState({playlistTracks: list});
    }
  }

  removeTrack(track){
    let list = this.state.playlistTracks;
    
    list = list.filter((item) =>{
      return item.id !== track.id ?? item;

    });
    
    this.setState({playlistTracks: list});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({playlistName: 'New Playlist',
    playlistTracks: []})
    });
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
