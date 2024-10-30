import { MdConnectWithoutContact, MdMoreHoriz } from "react-icons/md";
import { getSuggestedUsers, getTrends, userFollow } from "../api/requests";
import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { Spinner } from "../components/Spinner";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(254, 254, 254, 0.55);
  padding: 10px;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #292828;
  font-size: 14px;
  padding-left: 10px;
  outline: none;
  flex-grow: 1;

  &::placeholder {
    color: #7d7d7d;
  }
`;

const Trend = styled.div`
  h5 {
    font-size: 19px;
    font-weight: normal;
    margin-bottom: 10px;
  }

  .location,
  .posts {
    font-size: 11px;
    color: #434343;
  }

  .title {
    font-size: 15px;
    font-weight: normal;
    line-height: 1.4;
  }
`;

const Inner = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: rgba(254, 254, 254, 0.55);
  margin: 15px 0;
`;

const ConnectionList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  color: #504f4f;
`;

const ConnectionName = styled.div`
  color: #413e3e;
  font-size: 15px;
  font-weight: normal;
`;

const ConnectButton = styled.button`
  background-color: #36bbba;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  /* width: 150px; */
`;

const ImageAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: #8c9a9a;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Widget = () => {
  //
  const [suggestedConnection, setSuggestedConnection] = useState([]);
  const [trendingWords, setTrendingWords] = useState([]);
  const [loadingTrends, setLoadingTrends] = useState(true);
  const [loadingConnections, setLoadingConnections] = useState({});

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await getSuggestedUsers();
      setSuggestedConnection(response.data.suggestions || []);
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const fetchTrends = async () => {
      setLoadingTrends(true);
      const response = await getTrends();
      setTrendingWords(response.trendingWords || []);
      setLoadingTrends(false);
    };
    fetchTrends();
  }, []);

  const connectWithUser = async (userId) => {
    setLoadingConnections((prev) => ({ ...prev, [userId]: true }));
    try {
      await userFollow(userId);
      setSuggestedConnection((prev) =>
        prev.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.error("Failed to connect:", error);
    }
    setLoadingConnections((prev) => ({ ...prev, [userId]: false }));
  };

  return (
    <Container>
      {/* Search Section */}
      <Inner>
        <SearchContainer>
          <FaSearch color="#7d7d7d" />
          <SearchInput placeholder="Search trends" />
        </SearchContainer>
      </Inner>

      {/* Trends Section */}
      <Inner>
        <Trend>
          <h5>Discover more for you</h5>
          {loadingTrends ? (
            <Spinner />
          ) : trendingWords.length === 0 ? (
            <p>No trends for now</p>
          ) : (
            trendingWords.map((trend) => (
              <div
                className="flex justify-between mt-4 pt-1 pointer"
                key={trend.id}
              >
                <div>
                  <div className="location">Trending now</div>
                  <div className="title">{trend.word}</div>
                  <div className="posts">{trend.count} posts</div>
                </div>
                <div>
                  <MdMoreHoriz />
                </div>
              </div>
            ))
          )}
        </Trend>
      </Inner>

      {/* Who to Connect With Section */}
      {suggestedConnection.length > 0 && (
        <Inner>
          <Trend>
            <h5>Connect with</h5>
            {suggestedConnection.map((connection) => {
              return (
                <ConnectionList key={connection._id}>
                  <div className="flex gap-sm">
                    <ImageAvi>
                      {connection?.profilePic && (
                        <img src={connection?.profilePic} alt="User avatar" />
                      )}
                    </ImageAvi>
                    <div>
                      <ConnectionName>{connection.name}</ConnectionName>
                      <div className="flex flex-col">
                        <div className="posts mt-1">
                          {connection.postCount} posts
                        </div>
                      </div>
                      <ConnectButton
                        className="mt-2 flex"
                        onClick={() => connectWithUser(connection._id)}
                        disabled={loadingConnections[connection._id]}
                      >
                        {loadingConnections[connection._id] ? (
                          <Spinner size={12} />
                        ) : (
                          <MdConnectWithoutContact size={17} />
                        )}
                        {loadingConnections[connection._id] ? "" : "Connect"}
                      </ConnectButton>
                    </div>
                  </div>
                </ConnectionList>
              );
            })}
          </Trend>
        </Inner>
      )}
    </Container>
  );
};

export default Widget;
