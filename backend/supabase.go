package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)
func fetchPortfolio() (*Portfolio, error) {

	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")

	if supabaseURL == "" || supabaseKey == "" {
		return nil, fmt.Errorf("missing SUPABASE env variables")
	}

	url := supabaseURL + "/rest/v1/portfolio?select=*"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var data []Portfolio
	err = json.Unmarshal(body, &data)
	if err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return nil, fmt.Errorf("no portfolio found")
	}

	return &data[0], nil
}