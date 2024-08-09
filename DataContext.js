import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DataContext = createContext();

const apiUrl = 'https://biljard.catchmedia.no/api';

export const DataProvider = ({ children }) => {
    const { identity, loading } = useAuth();
    const [rank, setRank] = useState(null);
    const [totalPlayers, setTotalPlayers] = useState(null);
    const [points, setPoints] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [matches, setMatches] = useState([]);

    // Functions
    const getFirstLetter = (input) => {
        if (typeof input !== 'string' || input.length === 0) {
            return '';
        }
        return input.charAt(0);
    }

    // API
    const fetchPlayerStats = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: {
                    action: 'getPlayerRank',
                    player_id: identity.id
                }
            });

            setRank(response?.data?.rank);
            setTotalPlayers(response?.data?.totalPlayers);
            setPoints(response?.data?.points);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const fetchPlayers = async (setPlayers) => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: {
                    action: 'getPlayers',
                }
            });

            setPlayers(response.data.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: {
                    action: 'getLeaderboard',
                }
            });

            setLeaderboard(response.data.leaderboard);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const fetchMatches = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: {
                    action: 'getMatches',
                }
            });

            setMatches(response.data.matches);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleMatchSave = async (playerA, scoreA, playerB, scoreB) => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: {
                    action: 'saveMatch',
                    playerA,
                    scoreA,
                    playerB,
                    scoreB
                }
            });

            fetchPlayerStats();
            fetchMatches();
            fetchLeaderboard();

            console.log("Response: ", response.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        if (!loading && identity) {
            fetchPlayerStats();
            fetchLeaderboard();
            fetchMatches();
        }
    }, [loading, identity]);

    if (loading) {
        return null; // or some loading indicator
    }

    return (
        <DataContext.Provider value={{ getFirstLetter, handleMatchSave, fetchPlayers, fetchMatches, rank, totalPlayers, points, leaderboard, matches }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);